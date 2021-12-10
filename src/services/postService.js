const db = require('../../middleware/db');
const postQuery = require('../queries/postQuery');
const gameService = require('./gameService');

exports.addGamePost = async (tag, user_id, league_num, game_num, post_title, post_content) => {

    try{
        await db.query(postQuery.addPost, [user_id, 'game', post_title, post_content, new Date() ]);
        const post = await db.query(postQuery.getLatestPost,[user_id]);
        let post_num = post[0][0].post_num;

        const game = gameService.getGameByGameNum(game_num);
        const write_time = game.game_state;
        await db.query(postQuery.addGamePost, [post_num,league_num,game_num,write_time]);
        
        if(tag != null){
            for(let t of tag){
                await db.query(postQuery.addUserTag,[t,post_num]);
            }
        }
        return;
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}