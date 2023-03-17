const Io = require("../utils/Io");
const Users = new Io("./src/db/users.json");
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const cookie = require("cookie-parser");

const { v4: uuid } = require("uuid");


const authRegister = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const { image } = req.files;
    console.log(req.files);
    console.log(username, password);
    const users = await Users.read();
      const format = image.mimetype.split("/")[1];
      const path = process.cwd() +  "/src/uploads/" + uuid() + `.${format}`;
    const usersCount = (users[users.length - 1]?.id || 0) + 1;

    const ImageLink = process.cwd() + "uploads" + `${image.name}` + `.${format}`;
    console.log(ImageLink);
 
    const hashedPass = await bcrypt.hash(password, 12);

    const scheme = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().min(5).max(32).alphanum().required(),
      password: Joi.string().min(5).max(32).required(),
      age: Joi.number().required(),
    });

    const user = users.find((user) => {
      return user.username === username;
    });

    if (user) return res.redirect("/login/Form");

    const { error } = await scheme.validate(req.body);

    if (!error) return res.redirect("/login/Form");

    const newUser = new User(
      usersCount,
      name,
      username,
      hashedPass,
      ImageLink,
      false
    );
    const allUsers = users.length ? [...users, newUser] : [newUser];

    Users.write(allUsers);

    const token = jwt.sign({ username: newUser.username });

    res.cookie("token", token);

    res.redirect("/home");

    image.mv(path);

    res.status(200).json({ message: "user posted" });
  } catch (error) {
    console.log(error);
  }
};

const authLogin = async (req, res) => {
  try {
    const { password, username } = req.body;

    const auth = await Users.read();
    const foundUser = auth.find(
      (e) => e.username.toLowerCase() == username.toLowerCase()
    );
    if (!foundUser) return console.log("xato");
    const verified = await bcrypt.compare(password, foundUser.password);

    if (verified) {
      return res.redirect("/home");
    } else {
      return res.redirect("/login/Form");
    }
  } catch (error) {
    console.log(error);
  }
};

const registerGet = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {}
};
const loginGet = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {}
};
module.exports = { authLogin, authRegister, registerGet, loginGet };
