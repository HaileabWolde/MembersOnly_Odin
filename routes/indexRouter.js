const {Router}  = require("express");
const passport = require("passport");
const pgPool = require("../db/pool")
const indexRouter = Router();


indexRouter.get('/', (req, res)=> {
    console.log(req.session)
    console.log(req.user)
    res.render('index', { user: req.user })
})
indexRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));
indexRouter.post("/sign-up", async (req, res, next) => {
  try {
    await pgPool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});
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