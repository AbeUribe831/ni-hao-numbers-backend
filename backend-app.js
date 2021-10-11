const express = require('express');
const cors = require('cors');
const translate = require('./translate-methods');
const random_gen = require('./generate-numbers')
const app = express();

function validRequestBody(body) {
    const min_bound = parseFloat(body.min_bound);
    const max_bound = parseFloat(body.max_bound);
    const how_many = parseInt(body.how_many);
    const decimal_placement = parseInt(body.decimal_placement);
    // quetions, answers, chn_char_type
    if(!isNaN(min_bound) && !isNaN(max_bound) && min_bound >= -9999999999999.99 && max_bound <= 9999999999999.99 && min_bound <= max_bound &&
        !isNaN(how_many) && how_many >= 1 && how_many <= 50 && 
        !isNaN(decimal_placement) && decimal_placement >= 0 && decimal_placement <= 2 &&
        typeof body.questions !== 'undefined' && (body.questions.readCharacter === true || body.questions.readCharacter === false) && 
        (body.questions.readNumber === true || body.questions.readNumber === false) && 
        (body.questions.listen === true || body.questions.listen === false) &&
        (body.questions.readNumber !== false || body.questions.readCharacter !== false || body.questions.listen !== false) &&
        typeof body.chn_char_type !== 'undefined' && (body.chn_char_type === 'sc' || body.chn_char_type === 'tc')) {
            return;
        }
        throw 'bad request due to invalid syntax.\nCheck that min and max bound are between -9,999,999,999,999.99 to 9,999,999,999,999.99 and min_bound <= max_bound.\nhow_many is between 1 to 50.\nCheck that all questions are not false';
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
// error will contain status and message
app.post('/study-board-setup', (req, res) => {
    // respond with 400 error if user request's body is not valid
    try {
        validRequestBody(req.body);
    } catch(err) {
        return res.status(400).send(err);
    }
    // response with generated numbers to study if all is well
    // response with 500 error if issue arises from server side
    try {
        const generated_numbers  = random_gen.wrapper_generate_numbers(req.body);
        // add res.charset = 'utf-8' using charset allows use to send chinese chars
        // add res.contentType('text') 
        translate.get_q_and_a_wrapper(generated_numbers, req.body.chn_char_type).then((body, err) => {
            res.send(body);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Internal server error');
        }); 
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
module.exports = {
   app,
   port,
   validRequestBody 
}