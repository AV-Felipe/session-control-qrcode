const express = require('express');
const router = express.Router();
const db = require('../data-base/db-connection.js');
const queryStrings = require('../data-base/db-queries.js'); 
const bcrypt = require('../modules/data-encryption.js');
const jwt = require('../modules/jwt-module.js');


router.get('/', async (req, res)=>{
    res.status(200);
    res.type('application/json');
    res.send('{"endpoint": "ok"}');
})

router.post('/create', async (req, res)=>{
    console.log(req.body);

    const {full_name, user_name,password} = req.body;

    if(full_name && user_name && password){

        const hashedPassword = await bcrypt.generatePassword(password);

        // console.log(hashedPassword)

        try{
            const newUserId = await db.query(queryStrings.insertNewUser, [full_name, user_name, hashedPassword]);
            console.log(newUserId);

            res.status(201);
            res.type('application/json');
            res.json(newUserId[0]);

            return;
        }catch(err){
            console.log(err)

            res.status(409);
            res.type('application/json');
            res.send(`{"error": "this person or username already exists"}`);
            
            return;
        }




    }else{
        res.status(400);
        res.send();
        return;
    }





})


module.exports = router;