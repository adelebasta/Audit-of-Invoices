var mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        password: { type: String, required: true, minlength: [8, "at least 8 characters required"] },
        isFirstPassword: { type: Boolean, default: true }
    },
    { timestamps: true }
);

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    console.log(err);
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        return callback(null, isMatch);
    })
}

const User = mongoose.model("User", UserSchema);

module.exports = User;