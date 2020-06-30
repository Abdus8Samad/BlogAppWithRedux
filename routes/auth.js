const User = require('../models/user');
const passport = require('passport');

const router = require('express').Router();

router.post('/register',(req,res) =>{
    let newUser = new User({username:req.body.username,avatar:req.body.avatar});
    User.register(newUser,req.body.password)
    .then(user =>{
        console.log(user);
        passport.authenticate('local')(req,res,() =>{
            res.json({status:200,user:user});
        })
    })
    .catch(err =>{
        console.log(err);
        res.json({status:500,err:err});
    })
})

router.post('/login',passport.authenticate('local'),(req,res) =>{
    res.json({status:200,user:req.user});
})

router.post('/logout',(req,res) =>{
    req.logOut();
    res.json({status:200});
})

router.get('/checkLoggedStatus',(req,res) =>{
    if(req.isAuthenticated()){
        res.json({status:200,isLoggedIn:true,user:req.user});
    } else {
        res.json({status:200,isLoggedIn:false,user:null});
    }
})
module.exports = router;