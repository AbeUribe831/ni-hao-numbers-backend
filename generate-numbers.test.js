const get_random_inclusive_integer = require('./generate-numbers').get_random_inclusive_integer;
const get_random_inclusive_number_with_decimal_placement = require('./generate-numbers').get_random_inclusive_number_with_decimal_placement
const get_answer_type = require('./generate-numbers').get_answer_type;
const generate_numbers = require('./generate-numbers').generate_numbers;

beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
});
test('get_random_inclusive_integer(min, max) correct output', () => {
    expect(get_random_inclusive_integer('7','7')).toBe(7);
    expect(get_random_inclusive_integer('0','2')).toBe(1);
});

test('test get_random_inclusive_number_with_decimal_placement(min, max, decimal_placement) correct output', () => {
    // min and max bound enforced by backend-app.js (-9,999,999,999,999.99, 9,999,999,999,999.99)
    // sigfig of 2
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999.99', '-9999999999999.99', '2')).toBe('-9999999999999.99')
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999.99', '-34255.77', '2')).toBe('-5000000017127.88')
    expect(get_random_inclusive_number_with_decimal_placement('-5678889.00', '-0.12', '2')).toBe('-2839444.56');
    expect(get_random_inclusive_number_with_decimal_placement('-5678889.05', '0.76', '2')).toBe('-2839444.15');
    expect(get_random_inclusive_number_with_decimal_placement('-343.00', '12345.60', '2')).toBe('6001.30');
    expect(get_random_inclusive_number_with_decimal_placement('-0.88', '117.00', '2')).toBe('58.06');
    expect(get_random_inclusive_number_with_decimal_placement('0.00', '117.40', '2')).toBe('58.70');
    expect(get_random_inclusive_number_with_decimal_placement('85594.09', '9999999999999.99', '2')).toBe('5000000042797.04');
    expect(get_random_inclusive_number_with_decimal_placement('9999999999999.99', '9999999999999.99', '2')).toBe('9999999999999.99');

    // sigfig of 1 
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999.99', '-9999999999999.99', '2')).toBe('-9999999999999.99')
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999.9', '-9999999999999.9', '1')).toBe('-9999999999999.9')
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999.9', '-34255.7', '1')).toBe('-5000000017127.8')
    expect(get_random_inclusive_number_with_decimal_placement('-5678889.0', '-0.1', '1')).toBe('-2839444.5');
    expect(get_random_inclusive_number_with_decimal_placement('-5678889.0', '0.7', '1')).toBe('-2839444.1');
    expect(get_random_inclusive_number_with_decimal_placement('-343.0', '12345.6', '1')).toBe('6001.3');
    expect(get_random_inclusive_number_with_decimal_placement('-0.8', '117.0', '1')).toBe('58.1');
    expect(get_random_inclusive_number_with_decimal_placement('0.0', '117.4', '1')).toBe('58.7');
    expect(get_random_inclusive_number_with_decimal_placement('85594.0', '9999999999999.9', '1')).toBe('5000000042797.0');
    expect(get_random_inclusive_number_with_decimal_placement('9999999999999.9', '9999999999999.9', '1')).toBe('9999999999999.9');

    // sigfig of 0 
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999', '-9999999999999', '0')).toBe('-9999999999999')
    expect(get_random_inclusive_number_with_decimal_placement('-9999999999999', '-34255.7', '0')).toBe('-5000000017127')
    expect(get_random_inclusive_number_with_decimal_placement('-5678889', '0', '0')).toBe('-2839445');
    expect(get_random_inclusive_number_with_decimal_placement('-343', '12345', '0')).toBe('6001');
    expect(get_random_inclusive_number_with_decimal_placement('0', '117', '0')).toBe('59');
    expect(get_random_inclusive_number_with_decimal_placement('85594', '9999999999999', '0')).toBe('5000000042797');
    expect(get_random_inclusive_number_with_decimal_placement('9999999999999', '9999999999999', '0')).toBe('9999999999999');
});

test('get_answer_type(question_type, get_random_int)', () => {
    const called_once_zero = jest.fn().mockImplementation(() => 0);
    const called_once_one = jest.fn().mockImplementation(() => 1);
    const called_twice_one_zero = jest.fn()
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0);
    const called_twice_zero_one = jest.fn()
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 1);
    // readNumber check
    expect(get_answer_type('readNumber', called_once_zero)).toBe('writeCharacter');
    expect(get_answer_type('readNumber', called_twice_one_zero)).toBe('writeCharacter');
    expect(called_twice_one_zero).toBeCalledTimes(2);
    // readCharacter check
    expect(get_answer_type('readCharacter', called_once_one)).toBe('writeNumber');   
    expect(get_answer_type('readCharacter', called_twice_zero_one)).toBe('writeNumber');   
    expect(called_twice_zero_one).toBeCalledTimes(2);
    // listen checks
    expect(get_answer_type('listen', called_once_one)).toBe('writeNumber');
    expect(get_answer_type('listen', called_once_zero)).toBe('writeCharacter');
});

// - non number decimal placement or float
describe('generate_numbers', () => {
    test('generate_numbers throws error', () => {
        const bad_min = 
            {
                how_many: '1',
                decimal_placement: '0',
                min_bound: 'f',
                max_bound: '10',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const no_min = 
            {
                how_many: '1',
                decimal_placement: '0',
                max_bound: '10',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const bad_max = 
            {
                how_many: '1',
                decimal_placement: '0',
                min_bound: '0',
                max_bound: 'd',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const no_max = 
            {
                how_many: '1',
                decimal_placement: '0',
                min_bound: '0',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const bad_how_many = 
            {
                how_many: 'a',
                decimal_placement: '0',
                min_bound: '0',
                max_bound: 'd',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const no_how_many = 
            {
                decimal_placement: '0',
                min_bound: '0',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        const no_question = 
            {
                decimal_placement: '0',
                min_bound: '0',
                chn_char_type: 'sc'
            }
        expect(() => {generate_numbers(bad_min, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(no_min, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(bad_max, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(no_max, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(bad_how_many, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(no_how_many, jest.fn(), jest.fn(), jest.fn())}).toThrow('Error with input')
        expect(() => {generate_numbers(no_question, jest.fn(), jest.fn(), jest.fn())}).toThrow('Cannot convert undefined or null to object')
    })
    test('generate_numbers success test for how_many = 1', () => {
        const test_number = 
            {
                how_many: '1',
                decimal_placement: '0',
                min_bound: '0',
                max_bound: '10',
                questions: {
                    readNumber: true,
                    readCharacter: true,
                    listen: true
                },
                chn_char_type: 'sc'
            }
        // to get writeNumber
        const get_rand_int = jest.fn()
            .mockImplementationOnce(() => 1);
        const get_rand_decimal = jest.fn()
            .mockImplementationOnce(() => '5')
        const get_answer_type = jest.fn()
            .mockImplementationOnce(() => 'writeNumber')
        expect(generate_numbers(test_number, get_answer_type, get_rand_int, get_rand_decimal)).toEqual([{
            number: '5',
            question_type: 'readCharacter',
            answer_type: 'writeNumber'
        }]);
    });
    
    test('generate_numbers success test for multiple how_many', () => {
        const test_number = 
        {
            how_many: '6',
            decimal_placement: '0',
            min_bound: '0',
            max_bound: '10',
            questions: {
                readNumber: true,
                readCharacter: true,
                listen: true
            },
            chn_char_type: 'sc'
        }
        // readNumber, readCharacter, listen
        const get_rand_int = jest.fn()
            .mockImplementationOnce(() => 0)
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 0)
        const get_rand_decmial = jest.fn()
            .mockImplementationOnce(() => '5')
            .mockImplementationOnce(() => '9')
            .mockImplementationOnce(() => '10')
            .mockImplementationOnce(() => '1')
            .mockImplementationOnce(() => '2')
            .mockImplementationOnce(() => '7')
        const get_answer_type = jest.fn()
            .mockImplementationOnce(() => 'writeCharacter')
            .mockImplementationOnce(() => 'writeNumber')
            .mockImplementationOnce(() => 'writeCharacter')
            .mockImplementationOnce(() => 'writeNumber')
            .mockImplementationOnce(() => 'writeNumber')
            .mockImplementationOnce(() => 'writeCharacter')
        expect(generate_numbers(test_number, get_answer_type, get_rand_int, get_rand_decmial)).toEqual(
            [
                {
                    number: '5',
                    question_type: 'readNumber',
                    answer_type: 'writeCharacter'
                },
                {
                    number: '9',
                    question_type: 'readCharacter',
                    answer_type: 'writeNumber'
                },
                {
                    number: '10',
                    question_type: 'listen',
                    answer_type: 'writeCharacter'
                },
                {
                    number: '1',
                    question_type: 'readCharacter',
                    answer_type: 'writeNumber'
                },
                {
                    number: '2',
                    question_type: 'readCharacter',
                    answer_type: 'writeNumber'
                },
                {
                    number: '7',
                    question_type: 'readNumber',
                    answer_type: 'writeCharacter'
                },
            ]
        );
    });
})
    
