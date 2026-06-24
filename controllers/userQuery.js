const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstname").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastname").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 15 }).withMessage(`Last name ${lengthErr}`),

 
// Option 2 — add username and password to your validateUser array
body("username").trim()
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters"),
body("password").trim()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

];
async function createUser(req, res, next){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        title: "Create user",
        errors: errors.array(),
      });
    }
     // Use req.body directly instead of matchedData
    const { firstname, lastname, username, password } = req.body;

    

    try {
        await db.createUser(firstname, lastname, username, password);
        res.redirect("/log-in");
    } catch (error) {
        console.error(error);

        if (error.code === '23505') { // PostgreSQL unique violation code
            return res.status(400).render("sign-up-form", {
              title: "Create user",
              errors: [{ msg: "Username already taken" }]
         });
  }

  next(error); // unexpected error
}
}

module.exports = {
    createUser,
    validateUser
}