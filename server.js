const express = require('express'),
app = express(),
mongoose = require('mongoose'),
cookieParser = require('cookie-parser'),
passport = require('passport'),
expressSession = require('express-session'),
morgan = require('morgan'),
path = require('path'),
localauth = require('./auth/localauth'),
PORT = process.env.PORT || 8080,
Keys = require('./config/keys'),
bodyParser = require('body-parser');

mongoose.connect(Keys.mongo.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(() =>{
    console.log('connected to the db');
})
.catch((err) =>{
    console.log('Some error occured while connecting to the db',err)
})

app.use(express.json());
app.use(morgan('dev'));
app.use(expressSession({
    secret:'My secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        sameSite:"strict",
        httpOnly:true
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) =>{
    res.send('this is the server');
})

const blogRoutes = require('./routes/blogs'),
authRoutes = require('./routes/auth'),
indexRoutes = require('./routes/index');

app.use('/blogs',blogRoutes);
app.use('/auth',authRoutes);
app.use('/',indexRoutes);

app.listen(PORT,() =>{
    console.log(`Listening at port ${PORT}`);
})
