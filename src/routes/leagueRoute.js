var express = require('express');
var router = express.Router();

const leagueController = require('../controllers/leagueController')

/* 리그목록 페이지 */
router.get('/leagueListPage', leagueController.leagueListPage);

/* 리그목록 */
router.get('/leagueList', leagueController.leagueList);

/* 리그생성 페이지 */
router.get('/addLeaguePage', leagueController.addLeaguePage);

/* 리그생성 */
router.post('/addLeague', leagueController.addLeague);

/* 리그상세 페이지 */
router.get('/leagueDetailPage/:league_num', leagueController.leagueDetailPage);

/* 리그상세 */
router.get('/leagueDetail/:league_num', leagueController.leagueDetail);

/* 리그순위 */
router.get('/leagueRank/:league_num', leagueController.leagueRank);

/* 리그일정 */
router.get('/leagueSchedule/:league_num', leagueController.leagueSchedule);

/* 리그팀 추가 */
router.post('/addLeagueTeam', leagueController.addLeagueTeam);

/* 리그팀 삭제 */
router.get('/deleteLeagueTeam/:team_name', leagueController.deleteLeagueTeam);

module.exports = router;