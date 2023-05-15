const express = require("express");
const router = express.Router();
const userService = require("./UserService");

router.put("/", function (req, res) {
    userService.changePassword(req.body, function (err, updatedUser) {
        if (err) {
            res.send("Password could not be changed: " + err);
        } else {
            res.send(updatedUser);
        }
    });
});


module.exports = router;
