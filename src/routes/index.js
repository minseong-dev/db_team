var express = require('express');
var router = express.Router();

const mainRoute = require('./mainRoute')
const userRoute = require('./userRoute')
const leagueRoute = require('./leagueRoute')
const gameRoute = require('./gameRoute')
const postRoute = require('./postRoute')

router.use('/', mainRoute)
router.use('/user', userRoute)
router.use('/league', leagueRoute)
router.use('/game', gameRoute)
router.use('/post',postRoute)

module.exports = router;