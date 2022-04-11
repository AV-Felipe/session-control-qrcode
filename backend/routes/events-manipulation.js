const express = require('express');
const router = express.Router();
const db = require('../data-base/db-connection.js');
const queryStrings = require('../data-base/db-queries.js'); 
const bcrypt = require('../modules/data-encryption.js');
const jwt = require('../modules/jwt-module.js');


router.get('/', async (req, res)=>{

    const userList = await db.query(queryStrings.listAllEvents);

    res.status(200);
    res.type('application/json');
    res.json(userList);
})

router.post('/create', async (req, res)=>{

    console.log(req.body);

    const receivedToken = await jwt.verifyToken(req.cookies.access_token);

    if(receivedToken.userType != 'adm'){
        res.status(403);
        res.send();
        return;
    }

    const {title, description, event_date, event_time} = req.body;

    if(title && description && event_date && event_time){

        try{
            const newEventId = await db.query(queryStrings.insertNewEvent, [title, description, event_date, event_time]);
            console.log(newEventId);

            res.status(201);
            res.type('application/json');
            res.json(newEventId[0]);

            return;
        }catch(err){
            console.log(err)

            res.status(409);
            res.type('application/json');
            res.send(`{"error": "an event with this characteristics already exists"}`);
            
            return;
        }




    }else{
        res.status(400);
        res.send();
        return;
    }





})


module.exports = router;