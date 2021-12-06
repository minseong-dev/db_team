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
        const [users] = await conn.query(userQuery.getUsersByGameNum, [game_num]);
        conn.release();
        return users;
    }

    catch (error) {
        console.log(error)
        throw Error(error)
    }
    
}