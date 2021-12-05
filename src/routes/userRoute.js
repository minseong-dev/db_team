var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

/* 로그인 */
router.post('/signin', userController.signin);

/* 로그인 페이지 */
router.get('/signin', userController.signinPage);

/* 로그아웃 */
router.get('/logout', userController.logout);

module.exports = router;