const app = require('./backend-app').app;
const port = require('./backend-app').port;
require('custom-env').env()
// the purpose of seperating backend-app.js and server.js is for testing
app.listen(port, process.env.BASE_URL, () => {
    console.log(`Example app listening at http://${process.env.BASE_URL}:${port}`);
});