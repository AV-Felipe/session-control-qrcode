const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {

    async checkPassword(plainTextPassword, hashedPassword){

        return new Promise(function(resolve, reject) {

            bcrypt.compare(plainTextPassword, hashedPassword, function(err, res) {
                if (err) {
                     reject(err);//false
                } else {
                     resolve(res);//true
                }
            });
        });
    }
}