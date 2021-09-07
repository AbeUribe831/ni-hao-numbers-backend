const AnswerTypes = ['writeCharacter', 'writeNumber'];
const QuestionTypes = ['readNumber', 'readCharacter', 'listen'];

// backend-app.js checks that that the inputs are valid so we don't worry about them here
function get_random_inclusive_integer(min, max) {
    var min_num = parseInt(min);
    var max_num = parseInt(max);
    return Math.floor(Math.random() * (max_num - min_num + 1) + min_num);
}
// Assumes that min and max are passed with their appropriate decimal placement
// JS allows range [-9,999,999,999,999.99, 9,999,999,999,999.99]
function get_random_inclusive_number_with_decimal_placement(min, max, decimal_placement) {
    const decimal_in_tens = Math.pow(10, decimal_placement);
    var min_num = parseFloat(min) * decimal_in_tens;
    var max_num = parseFloat(max) * decimal_in_tens;
    var return_random = ((Math.random() * (max_num - min_num) + min_num) / decimal_in_tens).toFixed(decimal_placement);
    return return_random
}
function wrapper_get_answer_type(question_type) {
    return get_answer_type(question_type, get_random_inclusive_integer);
}

function get_answer_type(question_type, get_random_int) {
    let randomNum;
    // get answer type from: range from 0-2 or 0-1 while speaking is not an option
    do {
        randomNum = get_random_int(0, AnswerTypes.length - 1);
    } while (
        (question_type === 'readCharacter' && AnswerTypes[randomNum] === 'writeCharacter') ||
        (question_type === 'readNumber' && AnswerTypes[randomNum] === 'writeNumber'));
     return AnswerTypes[randomNum];
 
}
// user must make sure that question_types contains correct data
/*
{
    how_many: string of an int,
    decimal_placement: string of an int
    min_bound: string of an int
    max_bound: string of an int
    questions: {
        readNumber: boolean
        readCharacter: boolean
        listen: boolean
    }
    chn_char_type: 'sc' or 'tc' (not acatually used in this code)
}
*/
function wrapper_generate_numbers(question_types) {
    return generate_numbers(question_types, wrapper_get_answer_type, get_random_inclusive_integer, get_random_inclusive_number_with_decimal_placement);
}

function generate_numbers(question_types, answer_type_function, get_random_int, get_random_decimal) {
    const size = parseInt(question_types.how_many);
    const decimal_placement = parseInt(question_types.decimal_placement);
    // ensure the min and max is at the right decimal placement
    const min = parseFloat(question_types.min_bound).toFixed(decimal_placement);
    const max = parseFloat(question_types.max_bound).toFixed(decimal_placement);
    // const speak = question_types.speak;
    // get valid questions from list
    const valid_questions = [];
    Object.entries(question_types.questions).forEach(([key, value]) => {
        if(value && (QuestionTypes.includes(key))) {
            valid_questions.push(key);
        }
    });
    if(isNaN(size) ||
        isNaN(decimal_placement) || 
        isNaN(min) || 
        isNaN(max) ||
        valid_questions.length === 0) throw 'Error with input'
    let practice_questions = [];
    for (let i = 0; i < size; i++) {
        const question_type = valid_questions[get_random_int(0, valid_questions.length - 1)];
        const random_num = get_random_decimal(min, max, decimal_placement);
        const answer_type = answer_type_function(question_type);

        practice_questions.push({
            number: random_num,
            question_type: question_type,
            answer_type: answer_type 
        });
    }
    return practice_questions;
}

module.exports = { 
    generate_numbers,
    get_answer_type,
    get_random_inclusive_number_with_decimal_placement,
    get_random_inclusive_integer,
    wrapper_generate_numbers,
    wrapper_get_answer_type
 };
