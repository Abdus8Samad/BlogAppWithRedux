const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    author:String
})

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;