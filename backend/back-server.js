const express = require('express');
const cors = require('cors');

// endpoints for routes
const sessionControl = require('./routes/sessionControl.js');

// local constants
const port = 3003;

const app = express();

//CORS parameters
app.use(cors());

// main routes
app.use('/session', sessionControl)

app.listen(port, ()=>{
    console.log(`listening http://192.168.0.100:${port}\nCTRL + C to terminate`)
})