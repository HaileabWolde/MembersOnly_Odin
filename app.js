const path = require("node:path");
const express = require("express");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));



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

app.use("/", (req, res)=>{
   res.render('index')
});
app.use((req,res)=>{
    res.status(400).send('Page not found')
})
// Keep this as is for real server errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).render('error', { 
        message: err.message || "Something went wrong",
        statusCode: err.statusCode || 500
    });
});