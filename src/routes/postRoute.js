var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController')

/* 경기 게시글 작성 화면 */
router.get('/gamePost/league_num/:league_num/game_num/:game_num',postController.gamePost);

/* 경기 게시글 추가 기능 */
router.post('/addGamePost', postController.addGamePost);

module.exports = router;