const userService = require('../services/userService')

exports.signin = async (req, res) => {

    const { user_id, password } = req.body

    try {
        let signin = await userService.signin(user_id, password)
        req.session.user_id = signin[0].user_id
        return res.redirect('/')
    }

    catch(error) {
        res.send(
            `<script type="text/javascript">
            alert("아이디 또는 비밀번호가 올바르지 않습니다."); 
            location.href='./signin';
            </script>`
        );
    }

}

exports.signinPage = async (req, res) => {
    
    try{
        let sess = req.session.user_id
        return res.render('signin', { sess:sess })
    }

    catch (error) {
        return res.status(500).json(error)
    }

}

exports.logout = async (req, res) => {

    try{
        req.session.destroy(function(){
            req.session;
        });
        return res.send(`<script type="text/javascript">
            alert("로그아웃 되었습니다."); 
            location.href='/';
            </script>`);
    }

    catch (error) {
        return res.status(500).json(error)
    }

}