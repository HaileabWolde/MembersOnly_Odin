const {Router}  = require("express");
const pgPool = require("../db/pool")
const indexRouter = Router();


indexRouter.get('/', (req, res)=> {
    console.log(req.session)
    res.render('index')
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
module.exports = indexRouter;