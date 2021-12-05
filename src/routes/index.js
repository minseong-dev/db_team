var express = require('express');
var router = express.Router();

const mainRoute = require('./mainRoute')
const userRoute = require('./userRoute')
const leagueRoute = require('./leagueRoute')
const gameRoute = require('./gameRoute')

router.use('/', mainRoute)
router.use('/user', userRoute)
router.use('/league', leagueRoute)
router.use('/game', gameRoute)

module.exports = router;