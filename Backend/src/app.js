const express = require('express')
const cookieParser = require('cookie-parser')
const morgar = require('morgan')
const userRouter = require('../src/routes/user.route')
const user = require('./models/user.model')
const expressSession = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const path = require('path')

const app = express();


app.use(express.static("public"))
app.set('view engine' ,'ejs');


app.use(flash());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:'social-inspiration-platform'
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(morgar('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use('/',userRouter)


module.exports = app;