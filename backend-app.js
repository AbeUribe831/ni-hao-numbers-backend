const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const google_credentials = require('./google-credentials.json')['key-path'];
const translate = require('./translate-methods');
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
const port = 3000;


app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.post('/studyboardSetup', (req, res) =>{
    translate.get_q_and_a_from_gcloud(req.body.practice_questions).then((body, err) => {
        console.log(body);
        res.send(body);
    }).catch((err) => {
        console.log('error in scope of post method: ', err);
    });
});

app.listen(port, () => {
    console.log(google_credentials)
    exec(`export GOOGLE_APPLICATION_CREDENTIALS="${google_credentials}"`);
    console.log(`Example app listening at http://localhost:${port}`);
});