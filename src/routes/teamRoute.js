var express = require('express');
var router = express.Router();

const teamController = require('../controllers/teamController')

/* GET */
router.get('/a', teamController.a);

module.exports = router;