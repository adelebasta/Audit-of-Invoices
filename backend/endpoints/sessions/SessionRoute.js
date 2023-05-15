const express = require("express");
const router = express.Router();
const sessionService = require("./SessionService");

router.post("/login", function (req, res) {
  sessionService.createSessionToken(req.body, function (err, token, user) {
    if (err) {
      console.log(err);
      return res.status(404).send("Could not create token");
    }
    if (token) {
      res.header("Authorization", "Bearer " + token);
      return res.send(user);
    }
  });
});

module.exports = router;
