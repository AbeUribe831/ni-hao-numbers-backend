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
                word += " point";
                for(digit of split_num[1]) {
                    word += " " + convertNumToWord(digit)[0].displayWholeWord;
                }
            }
            num_as_words.push(word);
        });
        console.log('number as words: ', num_as_words);

        console.log('numbers to words: ', num_as_words);
        let [translated_chars] = await translate.translate(num_as_words, target);
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

module.exports = { get_q_and_a_from_gcloud };