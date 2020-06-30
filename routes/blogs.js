const Blog = require('../models/blogs'),
router = require('express').Router();

router.post('/new',(req,res) =>{
    Blog.create(req.body.blog)
    .then(blog =>{
        res.json({status:200,blog});
    })
    .catch(err =>{
        console.log(err);
        res.json({status:500})
    })
})

router.get('/getAllBlogs',(req,res) =>{
    Blog.find()
    .then(blogs =>{
        res.json(blogs);
    })
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;