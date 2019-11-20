const express = require('express');
const path = require('path');
const ejs = require('ejs');
const ejsLocals = require('ejs-locals');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passort = require('passport');

const port = process.env.PORT||3000;

const Routing = require('./Routing/routing');
const GlobalVariable = require('./Models/global');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('ejs',ejsLocals);
app.use(express.static(path.join(__dirname,'/public')));

app.use(bodyParser.urlencoded({
    extended: true
}));
bodyParser.json();

app.use(cookieParser());

app.use(session({
    name: 'cms-project',
    secret: 'jdhdfueifhuiehfejwkfefuw',
    key: 'hckjdhf',
    resave: false,
    saveUninitialized: false,
    cookie:{

    }
}));

app.use(passort.initialize());
app.use(passort.session());

app.use(function(req,res,next){
    //console.log('start');
    GlobalVariable.global_variable(req,res);
    //console.log(req.isAuthenticated());
    next();
});

app.use('/',Routing);

app.listen(port,function(){
    console.log(`server is listen at ${port}`);
});

