const {Router}  = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const pgPool = require("../db/pool")
const indexRouter = Router();


indexRouter.get('/', (req, res)=> {
    
    res.render('index', { user: req.user })
})
indexRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));
indexRouter.post("/sign-up", async (req, res, next) => {
  try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await pgPool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
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