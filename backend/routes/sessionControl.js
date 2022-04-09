const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    res.status(200);
    res.type('application/json');
    res.send('{"endpoint": "ok"}');
})

router.post('/login', async (req, res)=>{
    console.log(req.body);

    res.status(200);
    res.type('application/json');
    res.send('{"aqui": "foi"}');
})


module.exports = router;