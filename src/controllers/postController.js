const postService = require('../services/postService');
const userService = require('../services/userService');

exports.gamePost = async (req, res) => {

    const { league_num,game_num } = req.params;
    const users = await userService.getUsersByGameNum(game_num);
    try{
        let sess = req.session.user_uid
        return res.render('gamePost', {
            league_num:league_num,
            game_num:game_num,
            joinUser:users,
            sess:sess
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }
   
}

exports.addGamePost = async (req, res) => {

    try{
        const { tag,league_num, game_num, write_time, post_title, post_content } = req.body
        
        const user_id = req.session.user_id;
        postService.addGamePost(tag,user_id,league_num, game_num, write_time, post_title, post_content);
        
        let sess = req.session.user_uid

        return res.render('gamePost', { 
            league_num:league_num,
            game_num:game_num,

            sess:sess
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}