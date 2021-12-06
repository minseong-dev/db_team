exports.signin = 'select * from `user` where user_id=? and password=?'
exports.getUsersByGameNum = 'SELECT * FROM `user` WHERE user_id IN (SELECT user_id FROM join_user WHERE game_num = ?);'