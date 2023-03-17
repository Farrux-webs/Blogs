const express = require("express");
require("dotenv").config()
const cookie = require("cookie-parser");
const { env } = require("./config")
const app = express();
const fileUpload = require("express-fileupload");


app.use(express.json());
app.use(fileUpload());


app.use(express.urlencoded({extended: true}))

const PORT = env.PORT || 8080;


app.set("view engine", "ejs")
app.set("views", process.cwd() + "/src/views")

app.use(cookie())

const {Route} = require("./src/routes/router")

app.use("/", Route);

app.listen(PORT, ()=>{
  console.log(`Server is working on ${PORT} port`);
})



