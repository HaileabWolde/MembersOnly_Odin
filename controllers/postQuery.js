const db = require("../db/queries")

async function newPost(req, res, next){
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

module.exports = {
    newPost
}