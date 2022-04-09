const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// endpoints for routes
const sessionControl = require('./routes/sessionControl.js');

// local constants
const port = 3003;

const app = express();

//CORS parameters
const corsConfig = {
    origin: ['http://192.168.0.100:3000'],
    credentials: true,
}

app.use(cors(corsConfig));

app.use(cookieParser());

app.use(express.json());

// main routes
app.use('/session', sessionControl)

app.listen(port, ()=>{
    console.log(`listening http://192.168.0.100:${port}\nCTRL + C to terminate`)
})