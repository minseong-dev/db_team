var express = require('express');
var router = express.Router();

const gameController = require('../controllers/gameController')

router.get('/', gameController.recentGameList);

module.exports = router;