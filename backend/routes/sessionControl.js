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

router.post('/login', async (req, res)=>{
    console.log(req.body);
    
    const {user, password} = req.body; // destructuring the object

    if(user && password){

        try{

            let data = await db.query(queryStrings.getUserFullData, [user]);
            data = data[0];
            console.log(data);

            const passwordMatch = await bcrypt.checkPassword(password, data.password);
            console.log(passwordMatch);

            if(passwordMatch){

                const newToken = await jwt.generateToken({'username': data.user_name, 'userType': data.user_type})
                //console.log(newToken);

                res.status(200);
                res.cookie('access_token', newToken);
                res.type('application/json');
                res.send(`{"data": "${data.full_name}"}`);
                return;
            }else{
                res.status(401);
                res.type('application/json');
                res.send(`{"error": "invalid user name or password"}`);                
            }

        }catch(e){
            console.log(e)
            res.status(400);
            res.type('application/json');
            res.send(`${e}`);
            return;
        }



    }else{
        res.status(400);
        res.send();
        return;
    }


})


module.exports = router;