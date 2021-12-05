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

exports.addLeague = async (league_info) => {
    
    try{
        let addLeague = await db.query(addLeague.leagueList, [league_info])
        return addLeague[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueDetail = async (league_id) => {
    
    try{
        let leagueDetail = await db.query(leagueQuery.leagueDetail, [league_id])
        return leagueDetail[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

exports.leagueRank = async (league_id) => {
    
    try{
        let leagueRank = await db.query(leagueQuery.leagueRank, [league_id])
        return leagueRank[0]
    } 
    
    catch (error) {
        console.log(error)
        throw Error(error)
    }

}

leagueSchedule
exports.leagueSchedule = async (league_id) => {
    
    try{
        let leagueSchedule = await db.query(leagueQuery.leagueSchedule, [league_id])
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

deleteLeagueTeam
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