const Io = require("../utils/Io");
const Users = new Io("./src/db/users.json")
const User = require('../models/user')
const Joi = require("joi")
const bcrypt = require('bcrypt')
const fileUpload = require("express-fileupload");

const { v4: uuid } = require("uuid");


const UserGet = async(req, res)=>{
    try {
        const user = await Users.read();
        res.status(200).json( user );

    } catch (error) {
        console.log(error.message);
    }
}


// const UserPost = async(req, res)=>{
//     try {
//         const { username, password} = req.body;

//         const users = await Users.read()
//         const usersCount = (users[users.length - 1]?.id || 0) + 1;

//         const hashedPass = await bcrypt.hash(password, 12);
        
//         const scheme = Joi.object({
//           username: Joi.string().min(5).max(32).alphanum().required(),
//           password: Joi.string().min(5).max(32).required(),
//           age: Joi.number().required(),
//         });

//         const {error} = await scheme.validate(req.body)

      

//         const newUser = new User(
//           usersCount,
//           username,
//           hashedPass,
//           ImageLink,
//           false
//         );

//         const allUsers = users.length ? [...users, newUser] : [newUser]

//           if (error) 
//                 return res.status(200).json(error.message);

                
//                 Users.write(allUsers)
//                 image.mv(path);
//                 res.status(200).json({message: "user posted"})
//     } catch (error) {
        
//     }
// }



module.exports = { UserGet, };