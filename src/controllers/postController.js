const postService = require('../services/postService');
const userService = require('../services/userService');
const teamService = require('../services/teamService');
const gameService = require('../services/gameService');

// 경기 게시판 화면으로 이동
exports.gamePostList = async (req, res) => {
    const { page } = req.params;
    let { field, condition } = req.query;

    const gamePostInfo = await postService.getGamePostInfo(page,field,condition);
    gamePostInfo.map(item =>{
        const date = new Date(item.post_register_date);
        item.post_register_date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    })
    
    try{
        let sess = req.session.user_id
        return res.render('gamePostList', {
            sess:sess,
            page:page,
            field:field,
            condition:condition,
            gamePostInfo:gamePostInfo
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }
   
}

// 경기 게시글 작성 화면으로 이동
exports.gamePost = async (req, res) => {
    const { league_num,game_num } = req.params;
    try{
        //const users = await userService.getUsersByGameNum(game_num); [][]{}처리 안함
        //테스트
        const users = [{user_id : 'yh',name:'영훈'},{user_id : 'bob',name:'밥'},{user_id : 'a',name:'a'},{user_id : 'b',name:'b'}];

        let sess = req.session.user_id;
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

//경기 게시글 삽입동작
exports.addGamePost = async (req, res) => {
    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        const { tag,league_num, game_num, post_title, post_content } = req.body
        const user_id = req.session.user_id;
        postService.addGamePost(tag,user_id,league_num, game_num, post_title, post_content);
        
        const user = await userService.getUserByUserId(req.session.user_id);
        const team = await teamService.getTeamByTeamName(user.team_name);
        const gameListAfter = await gameService.getGameListAfter(team.team_name);
        let sess = req.session.user_id;
        return res.render('myGameListAfter', { 
            sess:sess,
            gameListAfter:gameListAfter
        })
    }

    catch(error) {
        console.log(error);
        return res.status(500).json(error)
    }

}