var atob = require('atob');
var jwt = require('jsonwebtoken');
const logger = require('../config/winston');

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        logger.info(token);

        const privateKey = process.env.JWT_KEY;
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Not Authorized" });
                throw new Error('Not Authorized');
            }
            logger.info('Token is valid');

            var payload = JSON.parse(atob(token.split('.')[1]));

            const nowUnixSeconds = Math.floor(Date.now() / 1000);;
            var expirationTime = +(process.env.TIMEOUT);
            var ttl = payload.exp - nowUnixSeconds;
            //console.log(payload.exp);
            //console.log(nowUnixSeconds);
            //console.log(ttl);
            //console.log(nowUnixSeconds + expirationTime);
            res.header('Authorization', 'Bearer ' + token);
            if (ttl < expirationTime / 6) {
                var refreshedToken = jwt.sign({ exp: nowUnixSeconds + expirationTime }, process.env.JWT_KEY, { algorithm: 'HS256' });
                //console.log(refreshedToken);
                res.header('Authorization', 'Bearer ' + refreshedToken);
                return next();
            }
            return next();
        });
    } else {
        res.status(500).json({ error: "Missing Header" });
        throw new Error('Not Authorized');
    }
}
module.exports = {
    isAuthenticated
}