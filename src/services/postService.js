const db = require('../../middleware/db');
const postQuery = require('../queries/postQuery');
const gameService = require('./gameService');

exports.addGamePost = async (tag, user_id, league_num, game_num, post_title, post_content) => {

    try{
        await db.query(postQuery.addPost, [user_id, 'game', post_title, post_content, new Date() ]);
        const post = await db.query(postQuery.getLatestPost,[user_id]);
        let post_num = post[0][0].post_num;

        const game = await gameService.getGameByGameNum(game_num);

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

exports.getGamePostInfo = async (page,field,condition) => {
    try{
        const conn = await db.getConnection();
        let query;
        if(field == 'post_title'){
            query = 
            `SELECT * FROM post INNER JOIN game_post 
            ON post.post_num = game_post.post_num 
            WHERE post.post_title like ? ORDER BY post.post_num DESC LIMIT ?,10;`;
            const [result] = await conn.query(query,[`%${condition}%`,(page-1)*10]);
            conn.release();
            return result;
        }else if(field == 'user_id'){
            query = 
            `SELECT * FROM post INNER JOIN game_post 
            ON post.post_num = game_post.post_num 
            WHERE user_id = ? ORDER BY post.post_num DESC LIMIT ?,10;`;

        }else if(field == 'game_num'){
            query = 
            `SELECT * FROM post INNER JOIN game_post 
            ON post.post_num = game_post.post_num 
            WHERE game_num = ? ORDER BY post.post_num DESC LIMIT ?,10;`;
            
        }else{
            throw error;
        }
        const [result] = await conn.query(query,[condition,(page-1)*10]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }

}


