import { create, find } from '../models/blogs';
const router = require('express').Router();

router.post('/new', (req, res) => {
    create(req.body.blog)
        .then(blog => {
            res.json({ status: 200, blog });
        })
        .catch(err => {
            console.log(err);
            res.json({ status: 500 })
        })
})

router.get('/getAllBlogs', (req, res) => {
    find()
        .then(blogs => {
            res.json(blogs);
        })
        .catch(err => {
            console.log(err);
        })
})

export default router;