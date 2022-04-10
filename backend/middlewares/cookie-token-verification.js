const jwt = require('../modules/jwt-module.js');

function cookieValidation(req, res, next){
    
    const receivedToken = req.cookies.access_token;

    const requestedRoute = req.originalUrl;

    if(!receivedToken && requestedRoute != '/session/login'){
        return res.sendStatus(403);
    }else if(!receivedToken && requestedRoute === '/session/login'){
        return next();
    }

    try{
        const tokenData = jwt.verifyToken(receivedToken);
        console.log(tokenData);
        //validações sobre os dados do token: {'username': data.user_name, 'userType': data.user_type}
        return next();
    }catch(e){
        console.log(e)
        return res.sendStatus(403);
    }
    
}

module.exports = cookieValidation