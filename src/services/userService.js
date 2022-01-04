const db = require('../../middleware/db')
const userQuery = require('../queries/userQuery')

exports.signin = async (user_id, password) => {

    try{
        console.log(user_id, password)
        let signin = await db.query(userQuery.signin, [user_id, password])
        return signin[0]
    }

    catch (error) {
        console.log(error)
        throw Error(error)
    }
    
}

exports.getUsersByGameNum = async (game_num) => {

    try{
        const conn = await db.getConnection();
        const [users] = await conn.query(userQuery.getJoinUsersByGameNum, [game_num]);
        conn.release();
        return users;
    }
    catch (error) {
        console.log(error)
        throw Error(error)
    }
    
}

exports.getUserByUserId = async (user_id) => {
    try{
        const conn = await db.getConnection();
        const [user] = await conn.query(userQuery.getUserByUserId, [user_id]);
        conn.release();
        return user[0];
    }
    catch (error) {
        console.log(error)
        throw Error(error)
    }
}

exports.getUsersByTeamName = async (team_name) => {
    try{
        const conn = await db.getConnection();
        const query = 
        `SELECT * FROM user WHERE team_name = ?`;
        const [result] = await conn.query(query,[team_name]);
        conn.release();
        return result;
    } catch(error){
        console.log(error);
         throw error;
    }
}