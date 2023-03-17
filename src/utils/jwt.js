const jwt = require("jsonwebtoken")
const {env} = require("../../config")

const sign = (payload) => jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: "7h"});
const verify = (payload) => jwt.verify(payload, env.SECRET_KEY);

module.exports = {
    sign, verify
}