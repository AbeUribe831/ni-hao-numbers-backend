const AnswerTypes = ['writeCharacter', 'writeNumber'];

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
    var retRand = ((Math.random() * (max_num - min_num) + min_num) / decimal_in_tens).toFixed(decimal_placement);
    return retRand
}
function get_answer_type(questionType) {
    let randomNum;
    // range from 0-2 or 0-1
    do {
         randomNum = Number(get_random_inclusive_number_with_decimal_placement(0, 1, 0));
    } while (
        (questionType === 'readCharacter' && AnswerTypes[randomNum] === 'writeCharacter') ||
        (questionType === 'readNumber' && AnswerTypes[randomNum] === 'writeNumber'));
     return AnswerTypes[randomNum];
 
}

function generate_numbers(question_types) {
    const size = question_types.how_many;
    const decimal_placement = question_types.decimal_placement;
    // ensure the min and max is at the right decimal placement
    const min = parseFloat(question_types.min_bound).toFixed(decimal_placement);
    const max = parseFloat(question_types.max_bound).toFixed(decimal_placement);
    // const speak = question_types.speak;
    // get valid questions from list
    const valid_questions = [];
    Object.entries(question_types.questions).forEach(([key, value]) => {
        if(value) {
            valid_questions.push(key);
        }
    });
    let practice_questions = [];
    for (let i = 0; i < size; i++) {
        const question_type = valid_questions[get_random_inclusive_integer(0, valid_questions.length - 1)];
        const random_num = get_random_inclusive_number_with_decimal_placement(min, max, decimal_placement);
        const answer_type = get_answer_type(question_type);

        practice_questions.push({
            number: random_num,
            question_type: question_type,
            answer_type: answer_type 
        });
    }

    return practice_questions;
}

module.exports = { generate_numbers };
