const validRequestBody = require('./backend-app').validRequestBody;
const app = require('./backend-app').app;
const throw_text = 'bad request due to invalid syntax.\nCheck that min and max bound are between -9,999,999,999,999.99 to 9,999,999,999,999.99 and min_bound <= max_bound.\nhow_many is between 1 to 50.\nCheck that all questions are not false'
const request = require('supertest');
// test for app.post('/studyboardSetup', (req, res) => {})
// TODO:: include error handling check from  validRequestBody, wrapper_generate_numbers, and get_q_and_a_wrapper
// TODO:: check that it can return one number, many numbers (of each question type), larger numbers, and decimals
test('validRequestBody errors', () => {
    const bad_how_many = {
        how_many: 'f',
        min_bound: '1',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_how_many = {
        min_bound: '1',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const how_many_less_than_zero = {
        how_many: '-1',
        min_bound: '0',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const how_many_greater_than_50 = {
        how_many: '51',
        min_bound: '-1',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const bad_min_bound = {
        how_many: '6',
        min_bound: 'asdf',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_min_bound = {
        how_many: '6',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const min_bound_less_than_min = {
        how_many: '6',
        min_bound: '-10000000000000',
        max_bound: '10',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const bad_max_bound = {
        how_many: '6',
        min_bound: '9',
        max_bound: '1.fish',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_max_bound = {
        how_many: '6',
        min_bound: '0',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const min_greater_than_max = {
        how_many: '6',
        min_bound: '10',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const bad_decimal_placement = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: 'zero',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_decimal_placement = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const decimal_placement_less_than_0 = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '-1',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const decimal_placement_greater_than_2 = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '-1',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_questions = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        chn_char_type: 'sc'
    };
    const no_read_number = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readCharacter: true,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_read_character = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const no_listen = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false
        },
        chn_char_type: 'sc'
    };
    const all_false_questions = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: false,
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const invalid_read_number = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: 'invalid',
            readCharacter: false,
            listen: false
        },
        chn_char_type: 'sc'
    };
    const invalid_read_character = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: 'invalid',
            listen: false
        },
        chn_char_type: 'sc'
    };
    const invalid_listen = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: 'invalid' 
        },
        chn_char_type: 'sc'
    };
    const invalid_chn_char_type = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: true 
        },
        chn_char_type: 'ac'
    };
    const no_chn_char_type = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: true 
        }
    };
    expect(() => {validRequestBody(no_how_many)}).toThrow(throw_text);
    expect(() => {validRequestBody(bad_how_many)}).toThrow(throw_text);
    expect(() => {validRequestBody(bad_min_bound)}).toThrow(throw_text);
    expect(() => {validRequestBody(how_many_less_than_zero)}).toThrow(throw_text);
    expect(() => {validRequestBody(how_many_greater_than_50)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_min_bound)}).toThrow(throw_text);
    expect(() => {validRequestBody(min_bound_less_than_min)}).toThrow(throw_text);
    expect(() => {validRequestBody(bad_max_bound)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_max_bound)}).toThrow(throw_text);
    expect(() => {validRequestBody(min_greater_than_max)}).toThrow(throw_text);
    expect(() => {validRequestBody(bad_decimal_placement)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_decimal_placement)}).toThrow(throw_text);
    expect(() => {validRequestBody(decimal_placement_less_than_0)}).toThrow(throw_text);
    expect(() => {validRequestBody(decimal_placement_greater_than_2)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_questions)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_read_number)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_read_character)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_listen)}).toThrow(throw_text);
    expect(() => {validRequestBody(all_false_questions)}).toThrow(throw_text);
    expect(() => {validRequestBody(invalid_read_number)}).toThrow(throw_text);
    expect(() => {validRequestBody(invalid_read_character)}).toThrow(throw_text);
    expect(() => {validRequestBody(invalid_listen)}).toThrow(throw_text);
    expect(() => {validRequestBody(invalid_chn_char_type)}).toThrow(throw_text);
    expect(() => {validRequestBody(no_chn_char_type)}).toThrow(throw_text);
});
test('validRequest success', () => {
    const valid_sc = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: false,
            listen: false 
        },
        chn_char_type: 'sc'
    };
    const valid_tc = {
        how_many: '6',
        min_bound: '0',
        max_bound: '9',
        decimal_placement: '0',
        questions: {
            readNumber: true,
            readCharacter: true,
            listen: false 
        },
        chn_char_type: 'tc'
    };
    const valid_large_negative_and_positive = {
        how_many: '6',
        min_bound: '-23455556676',
        max_bound: '9999999999999',
        decimal_placement: '0',
        questions: {
            readNumber: false,
            readCharacter: true,
            listen: true 
        },
        chn_char_type: 'tc'
    };
    const valid_decimal = {
        how_many: '6',
        min_bound: '-9999999999999.9',
        max_bound: '9999999999999.9',
        decimal_placement: '1',
        questions: {
            readNumber: true,
            readCharacter: true,
            listen: true 
        },
        chn_char_type: 'tc'
    };
    const valid_decimal_two = {
        how_many: '6',
        min_bound: '-9999999999999.99',
        max_bound: '9999999999999.99',
        decimal_placement: '2',
        questions: {
            readNumber: true,
            readCharacter: true,
            listen: true 
        },
        chn_char_type: 'tc'
    };
    expect(() => {validRequestBody(valid_sc)}).not.toThrow(throw_text)
    expect(() => {validRequestBody(valid_tc)}).not.toThrow(throw_text)
    expect(() => {validRequestBody(valid_large_negative_and_positive)}).not.toThrow(throw_text)
    expect(() => {validRequestBody(valid_decimal)}).not.toThrow(throw_text)
    expect(() => {validRequestBody(valid_decimal_two)}).not.toThrow(throw_text)
});

describe('test app.post(/studyboardSetup)', () => {
    const random_gen = require('./generate-numbers')
    jest.mock('./generate-numbers');
    test('error from generate_numbers', async () => {
        expect.assertions(1)
        random_gen.wrapper_generate_numbers.mockImplementation(() => {throw 'some error'});
        const response = await request(app).post('/studyboardSetup').send({
            how_many: '0',
            min_bound: '-9999999999999.99',
            max_bound: '9999999999999.99',
            decimal_placement: '2',
            questions: {
                readNumber: true,
                readCharacter: true,
                listen: true 
            },
            chn_char_type: 'tc'
        });
        expect(response.statusCode).toBe(400)
    })
})