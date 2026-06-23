const path = require("node:path");
const express = require("express");
const expressSession = require('express-session');

const pgSession = require('connect-pg-simple')(expressSession);
const pgPool = require("./db/pool")
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/indexRouter');
const {validateUser} = require('./controllers/userQuery')
const passport = require("passport");

// === Session Middleware ===
app.use(expressSession({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'user_sessions'   // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));


require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter);
app.use((req,res)=>{
    res.status(400).send('Page not found')
})

// Keep this as is for real server errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).render('partials/error', { 
        message: err.message || "Something went wrong",
        statusCode: err.statusCode || 500
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
