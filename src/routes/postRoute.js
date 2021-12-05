var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController')

/* 경기 게시판 화면으로 이동 */
router.get('/gamePostList/page/:page',postController.gamePostList);

/* 경기 게시글 작성 화면 */
router.get('/gamePost/league_num/:league_num/game_num/:game_num',postController.gamePost);

/* 경기 게시글 추가 기능 */
router.post('/addGamePost', postController.addGamePost);

module.exports = router;