const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const google_credentials = require('./google-credentials.json')['key-path'];
const translate = require('./translate-methods');
const random_gen = require('./generate-numbers')
const app = express();
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
    //console.log(req.body);
    const generated_numbers  = random_gen.generate_numbers(req.body);
    console.log(generated_numbers); 
    translate.get_q_and_a_from_gcloud(generated_numbers).then((body, err) => {
        //console.log(body);
        res.send(body);
    }).catch((err) => {
        console.log('error in scope of post method: ', err);
    });
});

app.post('/test', (req, res) => {
    translate.get_q_and_a_from_gcloud(list_to_translate).then((body, err) => {
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