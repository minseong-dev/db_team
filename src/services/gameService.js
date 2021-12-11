const db = require('../../middleware/db')
const gameQuery = require('../queries/gameQuery')
const userService = require('./userService');
const leagueService = require('./leagueService');

exports.myGameList = async (user_id) => {
    
    try{
        let list = await db.query(gameQuery.myGameList, [user_id])
        return list[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.applicationGameList = async (user_id) => {
    
    try{
        let list = await db.query(gameQuery.applicationGameList, [user_id])
        return list[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.recentGameList = async () => {
    
    try{
        let list = await db.query(gameQuery.recentGameList)
        return list[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.addGame = async (gameInfo) => {
    try{
        const {
            league_num,
            game_local,
            game_date,
            //game_day_week,
            game_time,
            game_location,
            game_fee,
            game_user_count,
            memo,
            game_recruit_end,
            //game_state
        } = gameInfo;
        const game_day_week = findDay(new Date(game_date));
        const conn = await db.getConnection();
        const query = 
        `INSERT INTO game 
        (
            league_num,
            game_local,
            game_date,
            game_day_week,
            game_time,
            game_location,
            game_fee,
            game_user_count,
            memo,
            game_recruit_end,
            game_state
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                '매칭전'
            );`;
        const [result] = await conn.query(query,
            [league_num,
            game_local,
            game_date,
            game_day_week,
            game_time,
            game_location,
            game_fee,
            game_user_count,
            memo,
            game_recruit_end,]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.addteamGame = async (insertId,team_name,league_name) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `INSERT INTO team_game 
        (
            team_name,
            game_num,
            league_num,
            score,
            warning_count
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?
            );`;
        const [result] = await conn.query(query,
            [
                team_name,
                insertId,
                league_name,
                0,
                0
            ]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getGameListBefore = async (team_name) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM game WHERE game_num IN 
        (SELECT game_num FROM team_game 
            WHERE game_num IN (SELECT game_num FROM game WHERE game_state = '매칭전') 
            AND team_name = ? );`;
        const [result] = await conn.query(query,[team_name]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getGameApplicationInfoBeforeByTeamName = async (team_name) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `select * from game inner join (SELECT * FROM game_application WHERE team_name = ? AND is_chosen = 0) ap on ap.game_num = game.game_num inner join league_record on league_record.team_name = ap.team_name ;`;
        const [result] = await conn.query(query,[team_name]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.deleteGameApplication = async (game_application_num) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `DELETE FROM game_application WHERE game_application_num = ?;`;
        const [result] = await conn.query(query,[game_application_num]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getGameListAfter = async (team_name) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT t1.team_name team_name1, t2.team_name team_name2, game.* FROM
        (SELECT * FROM team_game WHERE game_num IN
        (SELECT game_num FROM team_game WHERE game_num IN (SELECT game_num FROM game WHERE game_state != '매칭전') AND team_name = ?)
        AND team_name = ?) t1
        INNER JOIN
        (SELECT * FROM team_game WHERE game_num IN
        (SELECT game_num FROM team_game WHERE game_num IN (SELECT game_num FROM game WHERE game_state != '매칭전') AND team_name = ?)
        AND team_name != ?) t2
        ON t1.game_num = t2.game_num
        INNER JOIN game ON game.game_num = t1.game_num;`;
        const [result] = await conn.query(query,[team_name,team_name,team_name,team_name]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getDetailTeamInfo = async (team_name, league_num) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM team INNER JOIN (SELECT * FROM league_record WHERE league_league_num = ? AND team_name = ?) rc 
        ON rc.team_name = team.team_name;`;
        const [result] = await conn.query(query,[league_num,team_name]);
        conn.release();
        return result[0];
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getGameByGameNum = async (game_num) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM game WHERE game_num = ?;`;
        const [result] = await conn.query(query,[game_num]);
        conn.release();
        return result[0];
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.getTeamGameByTeamNameAndGameNum = async (team_name,game_num) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM team_game WHERE team_name = ? AND game_num = ?;`;
        const [result] = await conn.query(query,[team_name, game_num]);
        conn.release();
        return result[0];
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.changeGameState = async (game_num,game_state) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `UPDATE game SET game_state = ? WHERE game_num=?;`;
        const [result] = await conn.query(query,[game_state, game_num]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.addGameInfo = async (info) => {
    try{
        let { team_name1, team_name2, game_num, league_num } = info;
        let { user_id,score,warning } = info; // 문자열, 2개이상의 배열
        let { evalTime,evalFair,evalLang,evalClean } = info;

        const teamInfo1 = await this.getDetailTeamInfo(team_name1,league_num);
        const teamInfo2 = await this.getDetailTeamInfo(team_name2,league_num);
        const game = await this.getGameByGameNum(game_num);
        const teamGame1 = await this.getTeamGameByTeamNameAndGameNum(team_name1,game_num);
        const teamGame2 = await this.getTeamGameByTeamNameAndGameNum(team_name2,game_num);
        const teamUsers = await userService.getUsersByTeamName(team_name1);

        const conn = await db.getConnection();
        
        //팀 - 경기에 score 업데이트
        let total_score = 0;
        if(Array.isArray(score)==true){
            for ( let sc of score){
                total_score += parseInt(sc);
            }
        }else{
            total_score = parseInt(score);
        }

        let total_warning = 0;
        if(Array.isArray(warning)==true){
            for (let wr of warning){
                total_warning += parseInt(wr);
            }
        }else{
            total_warning = parseInt(warning);
        }

        let query = 
        `UPDATE team_game SET score = ? , warning_count = ? WHERE game_num = ? AND team_name = ?;`;
        await conn.query(query,[total_score, total_warning,game_num,team_name1]);

        //상대팀 평가 추가
        query = 
        `INSERT INTO opponent_evaluate VALUES (?,?,?,?,?);`;
        await conn.query(query,['evalTime',league_num,team_name1,game_num,evalTime]);
        await conn.query(query,['evalFair',league_num,team_name1,game_num,evalFair]);
        await conn.query(query,['evalLang',league_num,team_name1,game_num,evalLang]);
        await conn.query(query,['evalClean',league_num,team_name1,game_num,evalClean]);

        //참여 회원 추가
        query =
        `INSERT INTO join_user VALUES (?,?,?,?,?,?)`;

        if(Array.isArray(user_id)==true){
            let size = user_id.length;
            for (let step = 0; step < size; step++){
                await conn.query(query,[user_id[step],team_name1,game_num,league_num,warning[step],score[step]]);
            } 
        }else{
            await conn.query(query,[user_id,team_name1,game_num,league_num,warning,score]);
        }

        conn.release();
        return 'ok';
    } catch(error){
        console.log(error);
         throw error;
    }
}

exports.updateLeagueRecord = async (teamGame1,teamGame2) => {
    try{
        const conn = await db.getConnection();

        let league_record1 = await leagueService.getLeagueRecordByTeamNameAndLeagueNum(teamGame1.team_name,teamGame1.league_num);
        let league_record2 = await leagueService.getLeagueRecordByTeamNameAndLeagueNum(teamGame2.team_name,teamGame2.league_num);

        if(teamGame1.score == teamGame2.score){
            league_record1.draw_count += 1;
            league_record2.draw_count += 1;
        }else if(teamGame1.score > teamGame2.score){
            league_record1.win_count += 1;
            league_record2.defeat_count += 1;
        }else if(teamGame1.score < teamGame2.score){
            league_record1.defeat_count += 1;
            league_record2.win_count += 1;
        }

        const query = 
        `UPDATE league_record SET 
        game_count = ?, 
        win_count = ?, 
        defeat_count = ?, 
        draw_count = ? 
        WHERE team_name = ? AND league_league_num = ?;`;
        await conn.query(query,[
            parseInt(league_record1.game_count)+1,
            league_record1.win_count,
            league_record1.defeat_count,
            league_record1.draw_count,
            league_record1.team_name,
            teamGame1.league_num
        ]);

        await conn.query(query,[
            parseInt(league_record2.game_count)+1,
            league_record2.win_count,
            league_record2.defeat_count,
            league_record2.draw_count,
            league_record2.team_name,
            teamGame2.league_num
        ]);

        conn.release();
        return 'ok';
    } catch(error){
        console.log(error);
         throw error;
    }
}

function findDay(date){
    switch (date.getDay()) {
        case 0:
            return '일요일';
        case 1:
            return '월요일';
        case 2:
            return '화요일';
        case 3:
            return '수요일';
        case 4:
            return '목요일';
        case 5:
            return '금요일';
        case 6:
            return '토요일';
        default:
            throw new Error('요일 변환 오류');
    }
        
    
}