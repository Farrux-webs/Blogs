const {verify} = require("../utils/jwt")
const isAuth = (req, res, next) =>{
try {
    
const { token } = req.cookies;

if(!token){
   return  res.redirect("/register")
}
next()

} catch (error) {
    console.log(error);
}
}

module.exports = isAuth