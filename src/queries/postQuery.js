exports.addPost = 'INSERT INTO post (user_id, post_type, post_title, post_content,post_register_date) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())'
exports.getLatestPost = 'SELECT * FROM post WHERE user_id = ? ORDER BY post_num DESC LIMIT 0,1'
exports.addGamePost = 'INSERT INTO game_post VALUES (?, ?, ?, ?)'
exports.addUserTag = 'INSERT INTO user_tag VALUES (?, ?)'