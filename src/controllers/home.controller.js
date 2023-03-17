const Io = require("../utils/Io");
const Blogs = new Io("./src/db/Blog.json");
const Blog = require("../models/blog");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const cookie = require("cookie-parser");

const { v4: uuid } = require("uuid");

const view = 0;

const HomeGet = (req, res) => {
  try {

    const { id } = req.params

    console.log(views);

    res.render("home");
  } catch (error) {
    console.log(error);
  }
};













const HomePost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const { image } = req.files;

    const blogs = await Blogs.read();

    const format = image.mimetype.split("/")[1];
    const path = process.cwd() + "/src/uploads/" + uuid() + `.${format}`;

    const blogsCount = (blogs[blogs.length - 1]?.id || 0) + 1;

    const ImageLink = process.cwd() + "uploads" + `${image.name}` + `.${format}`;

    const scheme = Joi.object({
      title: Joi.string().required(),
      text: Joi.string().min(10).max(500).required(),
    });

    const { error } = await scheme.validate(req.body);

    const newBlog = new Blog(blogsCount, title, text, ImageLink);
    const allUsers = blogs.length ? [...blogs, newBlog] : [newBlog];

    Blogs.write(allUsers);
    image.mv(path);




  } catch (error) {
    console.log(error);
  }
};





module.exports = { HomeGet, HomePost };
