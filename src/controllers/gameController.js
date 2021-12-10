const gameService = require('../services/gameService');
const userService = require('../services/userService');
const teamService = require('../services/teamService');

exports.gameListPage = async (req, res) => {

    try{
        let myGameList = await gameService.myGameList(user_id);
        let applicationGameList = await gameService.applicationGameList(user_id);
        let sess = req.session.user_id;
        return res.render('index', { 
            page:'./',
            myGameList:myGameList,
            applicationGameList:applicationGameList,
            sess:sess 
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.myGameList = async (req, res) => {
    
    const { user_id } = req.body

    try{
        let myGameList = await gameService.myGameList(user_id)
        let sess = req.session.user_id
        return res.render('index', {
            page:'./',
            sess:sess, 
            myGameList:myGameList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.applicationGameList = async (req, res) => {
    
    const { user_id } = req.body

    try{
        let applicationGameList = await gameService.applicationGameList(user_id)
        let sess = req.session.user_id
        return res.render('index', {
            page:'./',
            sess:sess, 
            applicationGameList:applicationGameList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.recentGameList = async (req, res) => {
    try{
        let recentGameList = await gameService.recentGameList();
        let sess = req.session.user_id
        return res.render('index', {
            sess:sess, 
            recentGameList:recentGameList
        })
    }
    catch (error) {
        return res.status(500).json(error)
    }

}

// 문제생길까봐 위쪽 안건들고 밑에 추가해서 할게요

exports.myGameListBefore = async (req, res) => {

    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        const user = await userService.getUserByUserId('yh');
        const team = await teamService.getTeamByTeamName(user.team_name);
        const gameListBefore = await gameService.getGameListBefore(team.team_name);
        const applicationInfo = await gameService.getGameApplicationInfoBeforeByTeamName(team.team_name);
        let sess = req.session.user_id;
        console.log(applicationInfo);
        return res.render('myGameListBefore', { 
            sess:sess,
            gameListBefore:gameListBefore,
            applicationInfo:applicationInfo
        })
    }

    catch(error) {
        console.log(error);
        return res.status(500).json(error)
    }

}

exports.myGameListAfter = async (req, res) => {

    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        const user = await userService.getUserByUserId('yh');
        const team = await teamService.getTeamByTeamName(user.team_name);
        const gameListAfter = await gameService.getGameListAfter(team.team_name);
        let sess = req.session.user_uid
        return res.render('myGameListAfter', { 
            sess:sess,
            gameListAfter:gameListAfter
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.addGamePage = async (req, res) => {
    
    try{
        let sess = req.session.user_id;
        return res.render('addGamePage', {
            sess:sess
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.addGame = async (req, res) => {
    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리

        const user = await userService.getUserByUserId('yh');
        const result = await gameService.addGame(req.body);
        await gameService.addteamGame(result.insertId, user.team_name, 2); // 임시로 2번 리그에 추가

        let sess = req.session.user_id;
        return res.render('addGamePage', { 
            sess:sess
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.detail = async (req, res) => {
    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        let { team_name1, team_name2, game_num, league_num } = req.query;

        const teamInfo1 = await gameService.getDetailTeamInfo(team_name1,league_num);
        const teamInfo2 = await gameService.getDetailTeamInfo(team_name2,league_num);
        const game = await gameService.getGameByGameNum(game_num);
        const teamGame1 = await gameService.getTeamGameByTeamNameAndGameNum(team_name1,game_num);
        const teamGame2 = await gameService.getTeamGameByTeamNameAndGameNum(team_name2,game_num);

        console.log(teamInfo1);
        let sess = req.session.user_id;
        return res.render('gameDetail', { 
            sess:sess,
            teamInfo1:teamInfo1,
            teamInfo2:teamInfo2,
            game:game,
            teamGame1:teamGame1,
            teamGame2:teamGame2
        });

    }
    
    catch(error) {
        return res.status(500).json(error);
    }
}

exports.deleteGameApplication = async (req, res) => {
    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        const { game_application_num } = req.params;
        await gameService.deleteGameApplication(game_application_num);

        
        const user = await userService.getUserByUserId('yh');
        const team = await teamService.getTeamByTeamName(user.team_name);
        const gameListBefore = await gameService.getGameListBefore(team.team_name);
        const applicationInfo = await gameService.getGameApplicationInfoBeforeByTeamName(team.team_name);
        let sess = req.session.user_id;
        return res.render('myGameListBefore', { 
            sess:sess,
            gameListBefore:gameListBefore,
            applicationInfo:applicationInfo
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.startGame = async (req, res) => {
    try{
        req.session.user_id = 'yh'; //임시로 그냥 로그인 처리
        let { team_name1, team_name2, game_num, league_num } = req.query;

        await gameService.changeGameState(game_num,'경기중');
    
        const teamInfo1 = await gameService.getDetailTeamInfo(team_name1,league_num);
        const teamInfo2 = await gameService.getDetailTeamInfo(team_name2,league_num);
        const game = await gameService.getGameByGameNum(game_num);
        const teamGame1 = await gameService.getTeamGameByTeamNameAndGameNum(team_name1,game_num);
        const teamGame2 = await gameService.getTeamGameByTeamNameAndGameNum(team_name2,game_num);
    
        console.log(teamInfo1);
        let sess = req.session.user_id;
        return res.render('gameDetail', { 
            sess:sess,
            teamInfo1:teamInfo1,
            teamInfo2:teamInfo2,
            game:game,
            teamGame1:teamGame1,
            teamGame2:teamGame2
        })
    }
    
    catch(error) {
        return res.status(500).json(error)
    }
    
}