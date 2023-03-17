const {verify} = require("../utils/jwt")
const isAuth = (req, res, next) =>{
try {
    
const { token } = req.cookies;
next()

} catch (error) {
    console.log(error);
}
}

module.exports = isAuth