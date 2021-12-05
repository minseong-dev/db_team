const gameService = require('../services/gameService')

exports.gameListPage = async (req, res) => {

    try{
        let myGameList = await gameService.myGameList(user_id)
        let applicationGameList = await gameService.applicationGameList(user_id)
        let sess = req.session.user_uid
        return res.render('index', { 
            page:'./',
            myGameList:myGameList,
            applicationGameList:applicationGameList,
            sess:sess 
        })
    }

    catch(error) {
        return res.status(500).json(error)
    }

}

exports.myGameList = async (req, res) => {
    
    const { user_id } = req.body

    try{
        let myGameList = await gameService.myGameList(user_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            myGameList:myGameList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.applicationGameList = async (req, res) => {
    
    const { user_id } = req.body

    try{
        let applicationGameList = await gameService.applicationGameList(user_id)
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            applicationGameList:applicationGameList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.recentGameList = async (req, res) => {

    try{
        let recentGameList = await gameService.recentGameList()
        let sess = req.session.user_uid
        return res.render('index', {
            page:'./',
            sess:sess, 
            recentGameList:recentGameList
        })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}