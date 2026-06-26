const pgPool = require("./pool")
const passport = require("passport");
const bcrypt = require("bcryptjs");


async function createUser(firstname, lastname, username, password){
  const hashedPassword = await bcrypt.hash(password,  10);
  const {rows} = await pgPool.query("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)", [firstname, lastname, username, hashedPassword]);
  return rows;

}

async function fetchAllPost(){
  const {rows} = await pgPool.query(`SELECT 
    u.username AS author_name, 
    p.title AS post_title,
	p.id    AS post_id,
	p.content AS post_content,
	p.created_at as post_created
	
FROM users u
INNER JOIN post p 
    ON u.id = p.creator_id`)
    return rows;
}
async function createPost(id, post, description){
  const {rows} = await pgPool.query("INSERT INTO post(title, content, creator_id) VALUES ($1, $2, $3)", [ post, description, id])
}

async function fetchSinglePost(id){
  const {rows} = await pgPool.query(`
    SELECT 
    u.username AS author_name, 
    p.title AS post_title,
	p.id    AS post_id,
	p.content AS post_content,
	p.created_at as post_created
	
FROM users u
INNER JOIN post p 
    ON u.id = p.creator_id WHERE u.id = ${id}
    `)
    return rows;
}
async function deletePost(id){
  const {rows} = await pgPool.query(`DELETE FROM post WHERE id = $1`, [id])
}
module.exports = {
    createUser,
    createPost,
    fetchAllPost,
    fetchSinglePost,
    deletePost
}

