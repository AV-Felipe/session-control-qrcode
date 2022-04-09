const express = require('express');

const app = express();

const port = 3000;

app.use(express.static('./src'));

app.listen(port, ()=>{
    console.log(`listening http://192.168.0.100:${port}\nCTRL + C to terminate`)
})