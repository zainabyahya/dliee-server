const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

var validateNumber = function (number) {
    var re = /^07\d{9}$/;
    return re.test(number);
};

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        unique: true,
        required: 'رقم الهاتف مطلوب',
        validate: [validateNumber, 'الرجاء ادخال رقم صالح'],
    },
    password: {
        type: String,
        trim: true,
        required: 'كلمة السر مطلوبة',
    },
});

// hash password on create/update
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// helper to compare
userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;