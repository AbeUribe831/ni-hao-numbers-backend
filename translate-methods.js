const {Translate} = require('@google-cloud/translate').v2;
const textToSpeech = require('@google-cloud/text-to-speech');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');
const util = require('util');
// target is the language 
const target = 'zh';
const language_code = 'cmn-CN';
const language_gender = 'MALE';
const translate = new Translate();
const text_to_speech_client = new textToSpeech.TextToSpeechClient();

const audio_dir = __dirname + '/listening_files';

const convertNumToWord = require('js-number-to-word-processor');

function remove_files(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for(const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if(err) throw err;
            });
        }
    });
}
// param: numbers are a string 
async function translate_numbers_to_chinese_chars(numbers) {
    try {
        let num_as_words = [];
        numbers.forEach(number => {
            const split_num = number.split(".");
            // only the whole number as a word
            let word = convertNumToWord(split_num[0])[0].displayWholeWord;
            if(split_num.length > 1) {
                word += " Point";
                for(digit of split_num[1]) {
                    word += " " + convertNumToWord(digit)[0].displayWholeWord;
                }
            }
            num_as_words.push(word);
        });
        console.log('numbers to words: ', num_as_words);
        let [translated_chars] = await translate.translate(num_as_words, target);
        // must loop through each char to fix translation issues with decimal
        // TODO:: figure out how to work with traditional and simplified chinese characters
        translated_chars.forEach((translated_char, index) => {
            if(translated_char === '这') {
                translated_chars[index] = '十';
            }
        })
        console.log('translate: ', translated_chars)
        // return promise of array of characters
        return translated_chars;
    } catch (e) {
        console.log(e);
    }
}
// TODO:: async method to tranlate numbers to mp3 files
// TODO:: see if I can write one request for multiple numbers
// return: a list of the location of each audio file in order
async function translate_numbers_to_chinese_audio(numbers, file_name) {
   
    let outputFile_list = [];
    let index = 0;
    for (const number of numbers) {
        // .mp3 but have changed to .txt
        let outputFile = `${audio_dir}/${file_name}${index}.mp3`;
        const request = {
            input : {text: number},
            voice: {languageCode: language_code, ssmlGender: language_gender},
            audioConfig: {audioEncoding: 'MP3'}
        };
        const [response] = await text_to_speech_client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(outputFile, response.audioContent, 'binary');
        outputFile_list.push(outputFile);
        index++;
    };
    return outputFile_list;
}
// TODO:: deal with negatives: 负 (負) fu4 ex: 负三 = -3
// to_translate_numbers from user request
// TODO:: add checks that each instance in to_translate_numbers is valid or send error
// TODO:: create translate_audio directory if doesn't exit, delete all audio files at the end of method
// return: a json object of result 
async function get_q_and_a_from_gcloud(to_translate_numbers) {
    let listen_and_character = [];
    let listen_and_number = [];
    let character_list = [];
    // fill the three lists based on what sort of translations are needed for each number
    to_translate_numbers.forEach(question => {
        // will continue because this question will not need translation 
        if(question.question_type === 'readNumber' && question.answer_type === 'speak') {
            return;
        }
        if(question.question_type === 'listen') {
            if(question.answer_type === 'writeCharacter') {
                listen_and_character.push(question.number);
            }
            else {
                listen_and_number.push(question.number);
            }
        }
        else {
            character_list.push(question.number);
        }
    });
    console.log('listen and write char:', listen_and_character);
    console.log('listen and write num: ', listen_and_number);
    console.log('either read or write char: ', character_list);
    // TODO:: write an async function calling each translate method for each list
    let response = [];
    // use array.shift() to pop front element
    
        // translated_list is the response if promise succeeds otherwise go to catch
            console.log('does try run?');

            let trans_chars_list = await translate_numbers_to_chinese_chars(character_list);
            let files_lis_and_num_list = await translate_numbers_to_chinese_audio(listen_and_number, 'ListenAndNumber');
       
            
            let trans_chars_from_lis_and_char_list = await translate_numbers_to_chinese_chars(listen_and_character); 
            let files_lis_from_lis_and_char_list = await translate_numbers_to_chinese_audio(listen_and_character, 'ListenAndCharacter');
           

            console.log('files: ', files_lis_and_num_list);
            console.log('files and char: ', files_lis_from_lis_and_char_list);
            console.log('inside list: ', trans_chars_list);
            for (question of to_translate_numbers) {
                if(question.question_type === 'listen') {
                    // TODO:: clean up repetative code 
                    if(question.answer_type === 'writeCharacter') {
                        // get audio file written in base64 and make reponse with translated character
                        let audio_data = await fs.promises.readFile(files_lis_from_lis_and_char_list.shift());
                        response.push({
                            listen: audio_data.toString('base64'),
                            question: null,
                            answer: trans_chars_from_lis_and_char_list.shift(),
                            answer_type: question.answer_type
                        });
                    }
                    // get audio file and make response with number from the user request
                    else {
                        let audio_data = await fs.promises.readFile(files_lis_and_num_list.shift());
                        response.push({
                            listen: audio_data.toString('base64'),
                            question: null,
                            answer: question.number,
                            answer_type: question.answer_type
                        });
                    }
                }
                // readCharacter
                else if(question.question_type === 'readCharacter') {  
                    // answer with speaking, answer will be compared at runtime
                    if(question.answer_type === 'speak') {
                        response.push({
                            listen: null,
                            question: trans_chars_list.shift(),
                            answer: null,
                            answer_type: question.answer_type 
                        });
                    }
                    // question.answer_type === writeCharacter 
                    else {
                        response.push({
                            listen: null,
                            question: trans_chars_list.shift(),
                            answer: question.number,
                            answer_type: question.answer_type
                        });
                    }
                }
                // question.question_type === readNumber
                else {
                    if(question.answer_type === 'speak') {
                        response.push({
                            listen: null,
                            question: question.number,
                            answer: null,
                            answer_type: question.answer_type
                        });
                    }
                    // answer by writing character
                    else {
                        response.push({
                            listen: null,
                            question: question.number,
                            answer: trans_chars_list.shift(),
                            answer_type: question.answer_type
                        });
                    }
                }
            };
            remove_files(audio_dir);
            // console.log('before the return: ', response);
            return response;
}

// ---------------------------------------- writing local function to convert number to chinese char ---------------------------------------- //
const chinese_char_map = {
    zero_to_nine : {
        0: "零",
        1 : "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九"
    },
    sc: {
        tens: {
            10: "十",
            100: "百",
            1000: "千",
            10000: "万",
            100000000: "亿",
            1000000000000: "兆" 
        },
        "liang": "两",
        "." : "点",
        "-" : "负"
    },
    tc: {
        tens: {
            10: "十",
            100: "百",
            1000: "千",
            10000: "萬",
            100000000: "億",
            1000000000000: "兆" 
        },
        "liang": "兩",
        "." : "點",
        "-" : "負"
    }
}

// parm: chn_s_or_t: string with "tc" or "sc"
// parm: number: string
// TODO:: check that number is valid and in range of [-9,999,999,999,999; 9,999,999,999,999]
function conv_num_as_string_to_chn_char(chn_s_or_t, number) {
    let split_num = number.split(".");
    let decimal_translated = ""
    // convert decimals to chinese characters
    if (split_num.length == 2) {
        decimal_translated = chinese_char_map[chn_s_or_t]["."];
        split_num[1].forEach(digit => {
            decimal_translated += chinese_char_map["zero_to_nine"][digit];
        });
    }
    // translate whole number
    let chn_char_in_rev = []; 
    let abs_tens = 1;
    let local_tens = 1;
    for (let i = split_num[0].length - 1; i >= 0; i--) {
        const curr_num = split_num[0][i];
        let tens_char = "";
        // set tens if exists
        if (chinese_char_map[chn_s_or_t]["tens"][abs_tens] !== undefined) tens_char = chinese_char_map[chn_s_or_t]["tens"][abs_tens];
        else if (chinese_char_map[chn_s_or_t]["tens"][local_tens] !== undefined) tens_char = chinese_char_map[chn_s_or_t]["tens"][local_tens]; 

        // when zero and placing either 10k or 100 mil dont put zero for the case of higher order numbers
        if (curr_num === "0") {
            const end = chn_char_in_rev.length - 1;
            if (tens_char === chinese_char_map[chn_s_or_t]["tens"][10000] || tens_char === chinese_char_map[chn_s_or_t]["tens"][100000000]) {
                chn_char_in_rev.push(tens_char)
            }
            else if (chn_char_in_rev.length === 0 || 
                (chn_char_in_rev[end] !== chinese_char_map["zero_to_nine"][curr_num] &&
                 chn_char_in_rev[end] !== chinese_char_map[chn_s_or_t]["tens"][10000] &&
                 chn_char_in_rev[end] !== chinese_char_map[chn_s_or_t]["tens"][100000000]
                )) {
                    chn_char_in_rev.push(chinese_char_map["zero_to_nine"][curr_num]);
                }
        }
        else {
            // take care of which 2 to use for placing tens 
            if (tens_char === chinese_char_map[chn_s_or_t]["tens"][10] && chn_char_in_rev.length > 0 
                && chn_char_in_rev[chn_char_in_rev.length - 1] === chinese_char_map[chn_s_or_t]["liang"]) {
                    chn_char_in_rev[chn_char_in_rev.length - 1] = chinese_char_map["zero_to_nine"][2];
                }
            if(tens_char !== '')
                chn_char_in_rev.push(tens_char);
            // add number with logic for placing 2 for placing 2
            if (chinese_char_map["zero_to_nine"][curr_num] !== undefined) {
                if (curr_num === "2" && chn_char_in_rev.length > 0 && chn_char_in_rev[chn_char_in_rev.length - 1] !== chinese_char_map[chn_s_or_t]["tens"][10]) {
                    chn_char_in_rev.push(chinese_char_map[chn_s_or_t]["liang"]);
                }
                else {
                    chn_char_in_rev.push(chinese_char_map["zero_to_nine"][curr_num]);
                }
            }
            // add the negative sign at the end
            else if (curr_num === "-") {
                chn_char_in_rev.push(chinese_char_map[chn_s_or_t][curr_num]);
            }
        }
        abs_tens *= 10;
        if(local_tens === 1000) {
            let end = chn_char_in_rev.length - 1;
            if (chn_char_in_rev[end] === chinese_char_map[chn_s_or_t]["tens"][10000] || chn_char_in_rev[end] === chinese_char_map[chn_s_or_t]["tens"][100000000]) {
                chn_char_in_rev.pop();
                if (chn_char_in_rev[end - 1] !== chinese_char_map["zero_to_nine"][0]) {
                    chn_char_in_rev.push(chinese_char_map["zero_to_nine"][0]);
                }
            }
            local_tens = 1;
        }
        else local_tens *= 10;
    }
    
    // takes are of the case when whole number is a sigle digit
    if (chn_char_in_rev.length === 1) return chn_char_in_rev[0] + decimal_translated;
    // chn_char_in_rev to string 
    let full_number_translated = "";
    let index_no_excess_zeros = 0;
    while(chn_char_in_rev[index_no_excess_zeros] === chinese_char_map["zero_to_nine"][0])
        index_no_excess_zeros++;
        
    for (let i = chn_char_in_rev.length - 1; i >= index_no_excess_zeros; i--) {
            full_number_translated += chn_char_in_rev[i];
    }
    // if the full number just tens then remove one at the front
    const all_digits = `${chinese_char_map["zero_to_nine"][1]}${chinese_char_map["zero_to_nine"][2]}${chinese_char_map["zero_to_nine"][3]}${chinese_char_map["zero_to_nine"][4]}${chinese_char_map["zero_to_nine"][5]}${chinese_char_map["zero_to_nine"][6]}${chinese_char_map["zero_to_nine"][7]}${chinese_char_map["zero_to_nine"][8]}${chinese_char_map["zero_to_nine"][9]}`
    let ten_re = new RegExp(`^[${all_digits}]{0,1}${chinese_char_map[chn_s_or_t]["tens"][10]}{1}[${all_digits}]{0,1}$`);
    let full_number_as_tens = full_number_translated.match(ten_re);
    if (full_number_as_tens !== null && full_number_as_tens.length === 1 && full_number_as_tens[0][0] === chinese_char_map["zero_to_nine"][1]) {
        return full_number_as_tens[0].substr(1, full_number_as_tens[0].length) + decimal_translated;
    }
    full_number_translated += decimal_translated;
    return full_number_translated;
}

module.exports = { get_q_and_a_from_gcloud, conv_num_as_string_to_chn_char };
console.log(conv_num_as_string_to_chn_char("sc", "0"));
console.log(conv_num_as_string_to_chn_char("sc", "1"));
console.log(conv_num_as_string_to_chn_char("sc", "2"));
console.log(conv_num_as_string_to_chn_char("sc", "3"));
console.log(conv_num_as_string_to_chn_char("sc", "4"));
console.log(conv_num_as_string_to_chn_char("sc", "5"));
console.log(conv_num_as_string_to_chn_char("sc", "6"));
console.log(conv_num_as_string_to_chn_char("sc", "7"));
console.log(conv_num_as_string_to_chn_char("sc", "8"));
console.log(conv_num_as_string_to_chn_char("sc", "9"));
// fix yi-shi showing
console.log(conv_num_as_string_to_chn_char("sc", "10"));
console.log(conv_num_as_string_to_chn_char("sc", "12"));
console.log(conv_num_as_string_to_chn_char("sc", "15"));
console.log(conv_num_as_string_to_chn_char("sc", "22"));
console.log(conv_num_as_string_to_chn_char("sc", "27"));
console.log(conv_num_as_string_to_chn_char("sc", "100"));
console.log(conv_num_as_string_to_chn_char("sc", "200"));
console.log(conv_num_as_string_to_chn_char("sc", "202"));
console.log(conv_num_as_string_to_chn_char("sc", "222"));
console.log(conv_num_as_string_to_chn_char("sc", "2090"));
console.log(conv_num_as_string_to_chn_char("sc", "10000"));
console.log(conv_num_as_string_to_chn_char("sc", "520006771"));
console.log(conv_num_as_string_to_chn_char("sc", "500006771"));
console.log(conv_num_as_string_to_chn_char("sc", "1000043916225"));

console.log('divider for traditional');
console.log(conv_num_as_string_to_chn_char("tc", "0"));
console.log(conv_num_as_string_to_chn_char("tc", "1"));
console.log(conv_num_as_string_to_chn_char("tc", "2"));
console.log(conv_num_as_string_to_chn_char("tc", "3"));
console.log(conv_num_as_string_to_chn_char("tc", "4"));
console.log(conv_num_as_string_to_chn_char("tc", "5"));
console.log(conv_num_as_string_to_chn_char("tc", "6"));
console.log(conv_num_as_string_to_chn_char("tc", "7"));
console.log(conv_num_as_string_to_chn_char("tc", "8"));
console.log(conv_num_as_string_to_chn_char("tc", "9"));
// fix yi-shi showing
console.log(conv_num_as_string_to_chn_char("tc", "10"));
console.log(conv_num_as_string_to_chn_char("tc", "12"));
console.log(conv_num_as_string_to_chn_char("tc", "15"));
console.log(conv_num_as_string_to_chn_char("tc", "22"));
console.log(conv_num_as_string_to_chn_char("tc", "27"));
console.log(conv_num_as_string_to_chn_char("tc", "100"));
console.log(conv_num_as_string_to_chn_char("tc", "200"));
console.log(conv_num_as_string_to_chn_char("tc", "202"));
console.log(conv_num_as_string_to_chn_char("tc", "222"));
console.log(conv_num_as_string_to_chn_char("tc", "2090"));
console.log(conv_num_as_string_to_chn_char("tc", "10000"));
console.log(conv_num_as_string_to_chn_char("tc", "520006771"));
console.log(conv_num_as_string_to_chn_char("tc", "500006771"));
console.log(conv_num_as_string_to_chn_char("tc", "1000043916225"));