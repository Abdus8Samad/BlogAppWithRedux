import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: String,
    image: String,
    body: String,
    author: String
})

const Blog = model('blog', blogSchema);

export default Blog;