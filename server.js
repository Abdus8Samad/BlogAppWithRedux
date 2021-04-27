import express, { json } from 'express';
const app = express();
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { initialize, session } from 'passport';
import expressSession from 'express-session';
import morgan from 'morgan';
import path from 'path';
import localauth from './auth/localauth';
const PORT = process.env.PORT || 8080;
import { mongo } from './config/keys';
import { urlencoded } from 'body-parser';
connect(mongo.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('connected to the db');
    })
    .catch((err) => {
        console.log('Some error occured while connecting to the db', err)
    })

app.use(json());
app.use(morgan('dev'));
app.use(expressSession({
    secret: 'My secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "strict",
        httpOnly: true
    }
}));
app.use(cookieParser());
app.use(initialize());
app.use(session());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('this is the server');
})

import blogRoutes from './routes/blogs';
import authRoutes from './routes/auth';
import indexRoutes from './routes/index';

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})