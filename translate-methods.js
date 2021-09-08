const fs = require('fs');
const path = require('path');
const url = 'http://127.0.0.1:3500/chinese-numbers-to-audio';
const {XMLHttpRequest} = require('xmlhttprequest');

function promise_translate_numbers_to_chinese_chars(numbers, chn_char_type) {
    return new Promise((resolve) => {
        let num_as_chn_chars = [];
        numbers.forEach(number => {
            num_as_chn_chars.push(conv_num_as_string_to_chn_char(chn_char_type, number));
        });
        resolve(num_as_chn_chars);
    });
}
// TODO:: maybe check that numbers is an array
function translate_numbers_to_chinese_audio(numbers) {
    return new Promise((resolve, reject) => {
        // data with array
        let data = JSON.stringify({"chinese_numbers_list": numbers});
        
        let translate_http = new XMLHttpRequest();
        translate_http.open("POST", url);
        translate_http.setRequestHeader("Content-Type", "application/json");
        // what to do when the request is done
        translate_http.onreadystatechange = () => {
            if (translate_http.readyState === 4){
                 if(translate_http.status === 200) {
                    // returns an array
                    resolve(JSON.parse(translate_http.responseText)["chinese_audio"]);
                }
                else {
                    try {
                        reject({
                            status: translate_http.status,
                            message: JSON.parse(translate_http.responseText)["message"]
                        });
                    } catch(e) {
                        // this will be called if no connection to translate audio server is made
                        reject({
                            status: 500,
                            message: translate_http.responseText
                        });
                    }
                }
            }
        };
        translate_http.send(data);
    });
}
async function get_q_and_a_wrapper(to_translate_numbers, chn_char_type) {
    return await get_q_and_a(to_translate_numbers, chn_char_type, promise_translate_numbers_to_chinese_chars, translate_numbers_to_chinese_audio)
}
// to_translate_numbers from user request
// return: a json object of result 
async function get_q_and_a(to_translate_numbers, chn_char_type, translate_nums_to_chn_char_list, chn_chars_to_audio_list) {
    if (chn_char_type !== 'sc' && chn_char_type !== 'tc')  throw Error('Invalid parameter use either "sc" for simplified chinese or "tc" for traditional chinese');
    
    let listen_and_character = [];
    let listen_and_number = [];
    let character_list = [];
    try {
        // fill the three lists based on what sort of translations are needed for each number
        to_translate_numbers.forEach(question => {
            // will continue because this question will not need translation 
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
    }catch(error) {
        throw Error('to_translate_numbers was not a list')
    }
    try {
    let response = [];
    
    // translated_list is the response if promise succeeds otherwise go to catch
        let trans_chars_list = await translate_nums_to_chn_char_list(character_list, chn_char_type);
        let audio_lis_and_num_list = await chn_chars_to_audio_list( await
            translate_nums_to_chn_char_list(listen_and_number, chn_char_type)
        );         
        let trans_chars_from_lis_and_char_list = await translate_nums_to_chn_char_list(listen_and_character, chn_char_type);
        let audio_lis_from_lis_and_char_list = await chn_chars_to_audio_list(trans_chars_from_lis_and_char_list);
        for (question of to_translate_numbers) {
            if(question.question_type === 'listen') {
                if(question.answer_type === 'writeCharacter') {
                    // don't need to write audio_data.toString('base64') because already encoded
                    let audio_data = audio_lis_from_lis_and_char_list.shift();
                    response.push({
                        listen: audio_data,
                        question: null,
                        answer: trans_chars_from_lis_and_char_list.shift(),
                        answer_type: question.answer_type
                    });
                }
                // get audio file and make response with number from the user request
                else {
                    let audio_data = audio_lis_and_num_list.shift();
                    response.push({
                        listen: audio_data,
                        question: null,
                        answer: question.number,
                        answer_type: question.answer_type
                    });
                }
            }
            // readCharacter
            else if(question.question_type === 'readCharacter') {                      
                // question.answer_type === writeCharacter 
                response.push({
                    listen: null,
                    question: trans_chars_list.shift(),
                    answer: question.number,
                    answer_type: question.answer_type
                });
            }
            // readNumber
            else {                    
                // answer by writing character
                response.push({
                    listen: null,
                    question: question.number,
                    answer: trans_chars_list.shift(),
                    answer_type: question.answer_type
                });
            }
        };
        return response;
    }catch(error) {
        throw error
    }
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
// This method assumes bool for is_negative, correct char_set, and proper chn_numbers because it is only called
// by other methods that already check the validity of these parms
function get_negative_or_positive_number(is_negative, char_set, chn_number) {
    if(is_negative)
        return chinese_char_map[char_set]["-"] + chn_number;
    return chn_number;
}
// parm: chn_s_or_t: string with "tc" or "sc"
// parm: number: string
// return: translated number as a chinese character
// all the errror checks on the input are done here 
function conv_num_as_string_to_chn_char(chn_s_or_t, number) {
    // check that inputs are valid
    if(number === "" || isNaN(number)) throw new Error('Parameter for number is not a valid number');
    const num_as_float = parseFloat(number);
    if(num_as_float < -9999999999999.99 || num_as_float > 9999999999999.99) throw new Error('Number is out of range must be between -9,999,999,999,999.99 to 9,999,999,999,999.99');
    if (chn_s_or_t !== 'sc' && chn_s_or_t !== 'tc') throw new Error('Invalid parameter use either "sc" for simplified chinese or "tc" for traditional chinese');
    
    let split_num = number.split(".");
    let decimal_translated = ""
    // convert decimals to chinese characters
    if (split_num.length == 2) {
        decimal_translated = chinese_char_map[chn_s_or_t]["."];
        for (let digit of split_num[1]) {
            decimal_translated += chinese_char_map["zero_to_nine"][digit];
        };
    }
    // translate whole number
    let chn_char_in_rev = []; 
    let abs_tens = 1;
    let local_tens = 1;
    let is_negative = false;
    for (let i = split_num[0].length - 1; i >= 0; i--) {
        const curr_num = split_num[0][i];
        if(curr_num === "-") {
            is_negative = true;
            break;
        }
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
    if (chn_char_in_rev.length === 1) 
        return get_negative_or_positive_number(is_negative, chn_s_or_t, chn_char_in_rev[0] + decimal_translated);
    // chn_char_in_rev to string 
    let full_number_translated = "";
    let index_no_excess_zeros = 0;
    while(chn_char_in_rev[index_no_excess_zeros] === chinese_char_map["zero_to_nine"][0])
        index_no_excess_zeros++;
        
    for (let i = chn_char_in_rev.length - 1; i >= index_no_excess_zeros; i--) {
            full_number_translated += chn_char_in_rev[i];
    }
    //used to remove 1 at the front if the leading number is  一十
    let ten_re = new RegExp(`^[${chinese_char_map["zero_to_nine"][1]}]{1}${chinese_char_map[chn_s_or_t]["tens"][10]}{1}.*`);
    let full_number_as_tens = full_number_translated.match(ten_re);
    if (full_number_as_tens !== null)
        return get_negative_or_positive_number(is_negative, chn_s_or_t, full_number_as_tens[0].substr(1, full_number_as_tens[0].length) + decimal_translated)
    full_number_translated += decimal_translated;
    return get_negative_or_positive_number(is_negative, chn_s_or_t, full_number_translated)
}

module.exports = { 
    get_q_and_a,
    get_q_and_a_wrapper,
    conv_num_as_string_to_chn_char,
    promise_translate_numbers_to_chinese_chars, 
    translate_numbers_to_chinese_audio,
    get_negative_or_positive_number
 };
