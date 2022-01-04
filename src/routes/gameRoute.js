var express = require('express');
var router = express.Router();

const gameController = require('../controllers/gameController')

/* 경기목록  페이지(매칭 전) */
router.get('/gameListPage', gameController.gameListPage);

/* 내가 만든 경기목록(매칭 전) */
router.get('/myGameList/:user_id', gameController.myGameList);

/* 내가 신청한 경기목록(매칭 전) */
router.get('/applicationGameList/:user_id', gameController.applicationGameList);

/* 최근 경기목록(전체) */
router.get('/recentGameList', gameController.recentGameList);

// 문제생길까봐 위쪽 안건들고 밑에 추가해서 할게요

/* 매칭전 경기목록  */
router.get('/myGameListBefore', gameController.myGameListBefore);

/* 매칭후 경기목록  */
router.get('/myGameListAfter', gameController.myGameListAfter);

/* 경기추가 페이지  */
router.get('/addGamePage', gameController.addGamePage);

/* 경기 추가하기  */
router.post('/addGame', gameController.addGame);

/* 매칭 신청 삭제하기  */
router.get('/deleteGameApplication/:game_application_num', gameController.deleteGameApplication);

/* 경기 디테일 페이지  */
router.get('/detail', gameController.detail);

module.exports = router;