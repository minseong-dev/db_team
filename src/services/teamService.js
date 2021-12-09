const db = require('../../middleware/db')
const teamQuery = require('../queries/teamQuery')

exports.getTeamByTeamName = async (team_name) => {
    try{
        const [team] = await db.query(teamQuery.getTeamByTeamName, [team_name]);
        return team[0];
    }

    catch (error) {
        console.log(error)
        throw Error(error)
    }
}