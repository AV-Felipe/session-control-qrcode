const jwt = require('jsonwebtoken');

const privateKey = 'top_secret';

const expiration = {expiresIn: '24h'};

module.exports = {
    async generateToken(payLoad){
        return jwt.sign(payLoad, privateKey, expiration);
    },

    async verifyToken(token){
        return jwt.verify(token, privateKey);
    }
}