const db = require('../../middleware/db')
const userQuery = require('../queries/userQuery')

exports.signin = async (user_uid, user_password) => {

    try{
        let signin = await db.query(userQuery.signin, [user_uid, user_password])
        return signin[0]
    }

    catch (error) {
        console.log(error)
        throw Error(error)
    }
    
}