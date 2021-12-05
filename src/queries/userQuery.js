exports.signin = 'select * from users where user_uid=? and user_password=?'
exports.getUsersByGameNum = 'SELECT * FROM `user` WHERE user_id IN (SELECT user_id FROM join_user WHERE game_num = ?);'