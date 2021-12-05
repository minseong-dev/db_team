const leagueService = require('../services/leagueService')

exports.leagueListPage = async (req, res) => {

    try{
        let leagueList = await leagueService.leagueList()
        let sess = req.session.user_uid
        return res.render('index', { 
            page:'./',
            leagueList:leagueList,
            sess:sess 
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.leagueList = async (req, res) => {

    try{
        let leagueList = await leagueService.leagueList()
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            leagueList:leagueList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.addLeaguePage = async (req, res) => {
    
    try{
        let sess = req.session.user_uid
        return res.render('index', { page:'./', sess:sess })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.addLeague = async (req, res) => {

    const { league_info } = req.body

    try{
        await leagueService.addLeague(league_info)
        return res.redirect('/league/leagueDetailPage/'+league_id)
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.leagueDetailPage = async (req, res) => {

    const { league_id } = req.params
    
    try{
        let detail_info = await leagueService.leagueDetail(league_id)
        let leagueRank = await leagueService.leagueRank(league_id)
        let leagueSchedule = await leagueService.leagueSchedule(league_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            detail_info:detail_info,
            leagueRank:leagueRank,
            leagueSchedule:leagueSchedule,
            sess:sess 
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.leagueDetail = async (req, res) => {

    const { league_id } = req.params

    try{
        let leagueDetail = await leagueService.leagueDetail(league_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            leagueDetail:leagueDetail
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.leagueRank = async (req, res) => {

    const { league_id } = req.params

    try{
        let leagueRank = await leagueService.leagueRank(league_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            leagueRank:leagueRank
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.leagueSchedule = async (req, res) => {

    const { league_id } = req.params

    try{
        let leagueSchedule = await leagueService.leagueSchedule(league_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            leagueSchedule:leagueSchedule
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.addLeagueTeam = async (req, res) => {

    const { leagueTeam_info } = req.body

    try{
        await leagueService.addLeagueTeam(leagueTeam_info)
        return res.redirect('/league/leagueDetailPage/'+league_id)
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.deleteLeagueTeam = async (req, res) => {

    const { leagueTeam_id } = req.params

    try{
        await leagueService.deleteLeagueTeam(leagueTeam_id)
        return res.redirect('/league/leagueDetailPage/'+league_id)
    }

    catch (error) {
        return res.status(500).json(error)
    }

}