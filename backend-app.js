const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const google_credentials = require('./google-credentials.json')['key-path'];
const translate = require('./translate-methods');
const random_gen = require('./generate-numbers')
const app = express();

function validRequestBody(body) {
    console.log(body);
    const min_bound = parseFloat(body.min_bound);
    const max_bound = parseFloat(body.max_bound);
    const how_many = parseInt(body.how_many);
    const decimal_placement = parseInt(body.decimal_placement);
    console.log('min bound: ', min_bound);
    console.log('max bound: ', max_bound);
    console.log('questions', body.questions)
    // quetions, answers, chn_char_type
    if(!isNaN(min_bound) && !isNaN(max_bound) && min_bound >= -9999999999999.99 && max_bound <= 9999999999999.99 && min_bound <= max_bound &&
        !isNaN(how_many) && how_many >= 1 && how_many <= 50 && 
        !isNaN(decimal_placement) && decimal_placement >= 0 && decimal_placement <= 2 &&
        typeof body.questions !== 'undefined' && (body.questions.readCharacter === true || body.questions.readCharacter === false) && 
        (body.questions.readNumber === true || body.questions.readNumber === false) && 
        (body.questions.listen === true || body.questions.listen === false) &&
        typeof body.answers !== 'undefined' && (body.answers.speak === true || body.answers.speak === false) && 
        (body.questions.readNumber !== false || body.questions.readCharacter !== false || body.questions.listen !== false) &&
        typeof body.chn_char_type !== 'undefined' && (body.chn_char_type === 'sc' || body.chn_char_type === 'tc')) {
            return;
        }
        throw 'bad request due to invalid syntax.\nCheck that min and max bound are between -9,999,999,999,999.99 to 9,999,999,999,999.99 and min_bound <= max_bound.\nHow many is between 1 to 50.\nCheck that all questions are not false';
}
// app.use() mount middleware functions to path (no specified path is root)
// extended alllows for us to parse URL-encoded objects that are JSON like or rich text
app.use(
    express.urlencoded({
        extended: true
    })
);
// allows us to treat requests as json objects
app.use(express.json());
app.use(cors());
const port = 5000;


app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.post('/studyboardSetup', (req, res) => {
    // return an error from user request
    try {
        validRequestBody(req.body);
        console.log('is valid?')
    } catch(err) {
        return res.status(400).send(err);
    }
    console.log('is here?')
    // TODO:: check that the body is valid eithere here or within other functions
    // TODO:: be more specific on the try catch?
    const generated_numbers  = random_gen.generate_numbers(req.body);
    console.log('got numbers');
    // add res.charset = 'utf-8' using charset allows use to send chinese chars
    // add res.contentType('text') 
    translate.get_q_and_a_wrapper(generated_numbers, req.body.chn_char_type).then((body, err) => {
        console.log(body);
        res.send(body);
    }).catch((err) => {
        console.log('error in scope of post method: ', err);
        res.status(500).send('Internal server error')
    });
});

app.post('/test', (req, res) => {
    translate.get_q_and_a_wrapper(list_to_translate).then((body, err) => {
        //console.log(body);
        res.send(body);
    }).catch((err) => {
        console.log('error in scope of post method: ', err);
    });
})

app.listen(port, () => {
    console.log(google_credentials)
    exec(`export GOOGLE_APPLICATION_CREDENTIALS="${google_credentials}"`);
    console.log(`Example app listening at http://localhost:${port}`);
});