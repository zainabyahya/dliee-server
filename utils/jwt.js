// src/utils/jwt.js
const jwt = require("jsonwebtoken");

/**
 * Signs a JWT with only the user’s _id and phoneNumber.
 * @param {Object} user  A Mongoose user document (must have _id, phoneNumber)
 * @returns {string}     A signed JWT
 */
function signToken(user) {
    const payload = {
        userId: user._id,
        phoneNumber: user.phoneNumber
    };
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
}

module.exports = signToken;
