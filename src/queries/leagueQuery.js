exports.leagueList = 'select * from league'
exports.addLeague = 'insert into league(league_name, user_id, start_date, finish_date, game_type, league_local) values(?, ?, ?, ?, ?, ?)'
exports.leagueDetail = 'select * from league where league_num=?'
exports.leagueRank = 'select * from league_record where league_league_num=? order by game_count, win_count, draw_count'
exports.leagueNum = 'select league_num from league where league_name=? and user_id=?'
exports.leagueSchedule = 'select distinct a.game_location, a.game_date, b.team_name, b.score, c.team_name, c.score from game a, team_game b, team_game c where a.game_num = b.game_num and a.game_num = c.game_num and a.league_num = b.league_num = ? and a.league_num = c.league_num and b.team_name != c.team_name order by a.game_date desc'