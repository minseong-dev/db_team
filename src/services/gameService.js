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