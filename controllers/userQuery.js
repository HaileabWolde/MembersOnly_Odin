const db = require("../db/queries")
async function createUser(req, res, next){
    const {firstname, lastname, username, password} = req.body;
    try{
        await db.createUser(firstname, lastname, username, password)
        res.redirect("/");
    }
    catch(error){
        console.log(error),
        next(error)
    }
}

module.exports = {
    createUser
}