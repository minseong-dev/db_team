const db = require('../../middleware/db')
const postQuery = require('../queries/postQuery')

exports.addGamePost = async (user_id, league_num, game_num, write_time, post_title, post_content) => {

    try{
        await db.query(postQuery.addPost, [user_id, 'game', post_title, post_content ]);
        const post = await db.query(postQuery.getLatestPost,[user_id]);
        const post_num = post.post_num;
        await db.query(postQuery.addGamePost, [post_num,league_num,game_num,write_time]);
        return;
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}