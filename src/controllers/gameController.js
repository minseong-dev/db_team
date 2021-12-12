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
        const user = await userService.getUserByUserId(req.session.user_id);
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
        const user = await userService.getUserByUserId(req.session.user_id);
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
        let { team_name1, team_name2, game_num, league_num } = req.query;
        let { action } = req.query;
        let { teamUserId } = req.query;
        let { user_id,score,warning } = req.query;

        if(action == '등록' && user_id != null & score != null && warning != null) await gameService.addGameInfo(req.query);

        if(action == '경기 시작') await gameService.changeGameState(game_num,'경기중');
        
        let teamInfo1 = await gameService.getDetailTeamInfo(team_name1,league_num);
        let teamInfo2 = await gameService.getDetailTeamInfo(team_name2,league_num);
        let game = await gameService.getGameByGameNum(game_num);
        let teamGame1 = await gameService.getTeamGameByTeamNameAndGameNum(team_name1,game_num);
        let teamGame2 = await gameService.getTeamGameByTeamNameAndGameNum(team_name2,game_num);
        let teamUsers = await userService.getUsersByTeamName(team_name1);

        if(teamGame1.score != null) console.log('팀1은 정보 입력 완료!');
        if(teamGame2.score != null) console.log('팀2는 정보 입력 완료!');
        if(teamGame1.score == null) console.log('팀1은 정보 입력 안함!');
        if(teamGame2.score == null) console.log('팀2는 정보 입력 안함!');

        if(teamGame1.score != null && teamGame2.score != null && game.game_state == '경기중'){
            await gameService.changeGameState(game_num,'경기종료');
            await gameService.updateLeagueRecord(teamGame1,teamGame2);
            teamInfo1 = await gameService.getDetailTeamInfo(team_name1,league_num);
            teamInfo2 = await gameService.getDetailTeamInfo(team_name2,league_num);
            game = await gameService.getGameByGameNum(game_num);
            teamGame1 = await gameService.getTeamGameByTeamNameAndGameNum(team_name1,game_num);
            teamGame2 = await gameService.getTeamGameByTeamNameAndGameNum(team_name2,game_num);
            teamUsers = await userService.getUsersByTeamName(team_name1);
        } 

        let joinUsers = [];
        if(teamUserId == null) teamUserId = [];
        
        if(action == '추가' && Array.isArray(teamUserId)==true){
            for ( let tuid of teamUserId ){
                let joinUser = await userService.getUserByUserId(tuid);
                joinUsers.push(joinUser);
            }
        }else if(action == '추가' && Array.isArray(teamUserId)==false){
            let joinUser = await userService.getUserByUserId(teamUserId);
            joinUsers.push(joinUser);
        }

        let sess = req.session.user_id;
        return res.render('gameDetail', { 
            sess:sess,
            teamInfo1:teamInfo1,
            teamInfo2:teamInfo2,
            game:game,
            teamGame1:teamGame1,
            teamGame2:teamGame2,
            teamUsers:teamUsers,
            teamUserId:teamUserId,
            joinUsers:joinUsers
        });

    }
    
    catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteGameApplication = async (req, res) => {
    try{
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