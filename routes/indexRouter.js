const {Router}  = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const pgPool = require("../db/pool")
const indexRouter = Router();


//fetching Controllers
const {createUser} = require("../controllers/userQuery")
const {validateUser} = require('../controllers/userQuery')

indexRouter.get('/', (req, res)=> {
    
    res.render('index', { user: req.user })
})
indexRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));
indexRouter.post("/sign-up", validateUser, createUser);
indexRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }))

indexRouter.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})
module.exports = indexRouter;