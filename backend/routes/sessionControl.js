const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    res.status(200);
    res.type('application/json');
    res.send('{"endpoint": "ok"}');
})


module.exports = router;