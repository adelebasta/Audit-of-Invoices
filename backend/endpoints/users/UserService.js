const User = require("../users/UserModel");

function changePassword(changes, callback) {
  User.findOne({}, function (err, user) {
    if (err) {
      return callback(err);
    }
    if (changes.password === process.env.LOGINPASSWORD) {
      return callback("Das neue Passwort darf nicht das initiale Passwort sein.");
    }
    user.comparePassword(changes.password, function (err, isMatch) {
      if (err) {
        return callback(err);
      }
      if (isMatch) {
        return callback("Das neue Passwort darf nicht das alte Passwort sein.");
      }
      user.set(changes);
      if (user.isFirstPassword === true) {
        user.isFirstPassword = false;
      }
      user.save(function (err, updatedUser) {
        if (err) {
          return callback(err);
        }
        updatedUser.password = undefined;
        return callback(null, updatedUser);
      });
    });
  });
}

function getUser(callback) {
  User.findOne({}, function (err, user) {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

function initPassword(callback) {
  User.findOne({}, function (err, user) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      console.log("Initializing first password");

      var firstUser = new User({
        password: process.env.LOGINPASSWORD,
      });
      firstUser.save(function (err, result) {
        if (err) {
          return callback(err);
        }
        return callback(null, user);
      });
    }
    callback(null, user);
  });
}

module.exports = {
  changePassword,
  getUser,
  initPassword,
};
