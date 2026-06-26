const { body, validationResult, matchedData } = require("express-validator");
const dayjs = require('dayjs'); // Install via: npm install dayjs
const db = require("../db/queries")
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";


const validatePost = [
  body("post").trim()
    .isAlpha('en-US', { ignore: ' ' }).withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`First name ${lengthErr}`),
];
async function newPost(req, res, next){
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).render("new-post", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const {id} = req.user
    const {post, description} = req.body

    try {
        await db.createPost(id, post, description)
        res.redirect("/")
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

async function fetchPosts(req, res, next){
    try{
        const posts = await db.fetchAllPost()
   
        res.render('index', {
            user: req.user,
            posts: posts,
            dayjs: dayjs // Pass the dayjs function to EJS
        })
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

async function fetchSinglePost(req, res){
    const {id} = req.params

    try {
        const post = await db.fetchSinglePost(id)
        
        console.log(req.user)
        res.render('single-post', {
            user: req.user,
            posts: post,
             dayjs: dayjs // Pass the dayjs function to EJS
        })
    }
    catch(error){
        console.log(error)
        next(error)
    }
}
async function deleteSinglePost(req, res){
    const {id} = req.params
    try{
        await db.deletePost(id)
        res.redirect("/")
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

module.exports = {
    newPost,
    validatePost,
    fetchPosts,
    fetchSinglePost,
    deleteSinglePost
}