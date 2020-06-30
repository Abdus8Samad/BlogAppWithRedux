const router = require('express').Router();

router.post('/createCookie',(req,res) =>{
    let { name, payload, expireTime } = req.body;
    res.cookie(name,payload,{
        maxAge: expireTime,
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.send('ok');
})

router.post('/getCookie',(req,res) =>{
    let { name } = req.body;
    let cookie = req.cookies[name];
    res.json({status:200,cookie});
})

router.post('/getAndClearCookie',(req,res) =>{
    let { name } = req.body;
    let cookie = req.cookies[name];
    console.log(cookie);
    if(cookie){
        res.clearCookie(name);
    }
    res.json({status:200,cookie});
})

module.exports = router;