const postService = require('../services/postService')

exports.addGamePost = async (req, res) => {

    try{
        const { league_num, game_num, write_time, post_title, post_content } = req.body
        
        const user_id = req.session.user_id;
        postService.addGamePost( user_id,league_num, game_num, write_time, post_title, post_content);
        
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