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
        const gameListAfter = await gameService.getGameListBefore(team.team_name);
        let sess = req.session.user_uid
        return res.render('myGameListAfter', { 
            sess:sess
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