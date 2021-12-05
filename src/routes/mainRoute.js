var express = require('express');
var router = express.Router();

const gameController = require('../controllers/gameController')

router.get('/recentGameList', gameController.gameList);

module.exports = router;