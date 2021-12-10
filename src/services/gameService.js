const db = require('../../middleware/db')
const gameQuery = require('../queries/gameQuery')

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