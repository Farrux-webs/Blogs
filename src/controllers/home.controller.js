const Io = require("../utils/Io");
const Blogs = new Io("./src/db/Blog.json");
const Blog = require("../models/blog");
const Histories = new Io("./src/db/history.json");
const History = require("../models/history");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const cookie = require("cookie-parser");

const { v4: uuid } = require("uuid");


const HomeGet = async(req, res) => {
  try {

    res.render("home");
  } catch (error) {
    console.log(error);
  }
};
const BlogGetbyid = async (req, res) => {
  try {

        const { method, blog } = req.body;

        const histories = await Histories.read();

        const history = histories[id - 1];

        method = "Get qilindi";

    const blogs = await Blogs.read();
    const userBlog = blogs[id - 1];
    const idBlog = blogs.filter(user => {
      if (user.id == userBlog.id) {
        return user;
      }
    });

    
        const newHistory = new History(history, method, blog);

        const allhistories = histories.length
          ? [...histories, newHistory]
          : [newHistory];

        Histories.write(allhistories);

    res.status(200).json(idBlog);
  } catch (error) {
    if (error) {
      console.log(error.message);
    }
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





module.exports = { HomeGet, HomePost, BlogGetbyid };
