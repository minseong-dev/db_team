const db = require('../../middleware/db')
const leagueQuery = require('../queries/leagueQuery')

exports.leagueList = async () => {
    
    try{
        let leagueList = await db.query(leagueQuery.leagueList)
        return leagueList[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.addLeague = async (league_name, user_id, start_date, finish_date, game_type, league_local) => {
    
    try{
        let addLeague = await db.query(leagueQuery.addLeague, [league_name, user_id, start_date, finish_date, game_type, league_local])
        return addLeague[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueNum = async (league_name, user_id) => {
    
    try{
        let leagueNum = await db.query(leagueQuery.leagueNum, [league_name, user_id])
        return leagueNum[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueDetail = async (league_num) => {
    
    try{
        let leagueDetail = await db.query(leagueQuery.leagueDetail, [league_num])
        return leagueDetail[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueRank = async (league_num) => {
    
    try{
        let leagueRank = await db.query(leagueQuery.leagueRank, [league_num])
        return leagueRank[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueSchedule = async (league_num) => {
    
    try{
        let leagueSchedule = await db.query(leagueQuery.leagueSchedule, [league_num])
        return leagueSchedule[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.addLeagueTeam = async (leagueTeam_info) => {
    
    try{
        let addLeagueTeam = await db.query(leagueQuery.addLeagueTeam, [leagueTeam_info])
        return addLeagueTeam[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.deleteLeagueTeam = async (leagueTeam_id) => {
    
    try{
        let deleteLeagueTeam = await db.query(leagueQuery.deleteLeagueTeam, [leagueTeam_id])
        return deleteLeagueTeam[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.getLeagueRecordByTeamNameAndLeagueNum = async (team_name,league_num) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM league_record WHERE team_name = ? AND league_num = ?;`;
        const [result] = await conn.query(query,[team_name, league_num]);
        conn.release();
        return result[0];
    } catch(error){
        console.log(error);
         throw error;
    }
}