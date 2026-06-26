const {Router}  = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const pgPool = require("../db/pool")
const indexRouter = Router();


//fetching Controllers
const {createUser} = require("../controllers/userQuery")

const {newPost, validatePost, 
  fetchPosts, fetchSinglePost, deleteSinglePost} = require("../controllers/postQuery")
const {validateUser} = require('../controllers/userQuery')

indexRouter.get('/', fetchPosts)
indexRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));
indexRouter.get('/log-in', (req, res)=> {
const messages = req.session.messages || [];
    
    // Optional: clear the messages so they don't show again on refresh
    req.session.messages = [];

    res.render("login-form", {
        errors: messages.map(msg => ({ msg }))
    });
})
indexRouter.get('/new-post', (req, res)=> {
  res.render("new-post", { user: req.user })})

indexRouter.get('/post/:id', fetchSinglePost)

indexRouter.post("/new-post", validatePost, newPost)
indexRouter.post("/sign-up", validateUser, createUser);
indexRouter.post("/log-in",
 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }))
indexRouter.post("/delete-post/:id", deleteSinglePost)
indexRouter.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})
module.exports = indexRouter;