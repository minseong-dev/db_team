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

module.exports = router;