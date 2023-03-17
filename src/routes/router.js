const {Router} = require("express");
const Route = Router();

const {
  authLogin,
  authRegister,
  registerGet,
  loginGet,
} = require("../controllers/auth");
const {
  HomeGet,
  HomePost,
  BlogGetbyid,
} = require("../controllers/home.controller");
const isAuth = require("../middlewares/isAuthMiddleware")

Route.get("/home", isAuth, HomeGet);
Route.get("/home/:id", isAuth, BlogGetbyid);
Route.post("/home", HomePost);
Route.post("/login", authLogin);
Route.post("/register", authRegister);
Route.get("/register", registerGet);
Route.get("/login/Form", loginGet);

module.exports = { Route };