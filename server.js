const app = require('./backend-app').app;
const port = require('./backend-app').port;
// the purpose of seperating backend-app.js and server.js is for testing
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
});