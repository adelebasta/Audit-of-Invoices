var userService = require('../users/UserService');
var jwt = require('jsonwebtoken');

function createSessionToken(props, callback) {
    userService.getUser(function (err, user) {
        if (err) {
            return callback(err);
        }
        if (user) {
            user.comparePassword(props.password, function (err, isMatch) {
                if (err) {
                    return callback(err, null);
                }
                if (isMatch) {
                    var issuedAt = Math.floor(Date.now() / 1000);
                    var expirationTime = +(process.env.TIMEOUT);
                    var expiresAt = issuedAt + expirationTime;
                    const privateKey = process.env.JWT_KEY;
                    let token = jwt.sign({ exp: expiresAt }, privateKey, { algorithm: 'HS256'});
                    console.log(token);
                    user.password = undefined;
                    return callback(null, token, user);
                }
                return callback("Wrong login credentials");
            });
        } else {
            return callback("User not found");
        }
    });
}

module.exports = {
    createSessionToken
}