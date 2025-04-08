const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
const passport = require('passport')
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
const upload = require('../multer/multer')

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/profile', isLoggedIn,async (req, res, next) => {
    const user =await userModel.findOne({
        username: req.session.passport.user
    }).populate('posts')
    
    console.log(user);
    res.render('profile' ,{user});
})

router.get('/login', (req, res, next) => {
    res.render('login',{error : req.flash('error')});
})

router.get('/feed', (req, res, next) => {
    res.render('feed');
})

router.post('/register', (req, res) => {
    const { username, email, fullname } = req.body;
    const userData = new userModel({ username, email, fullname });

    userModel.register(userData, req.body.password)
        .then(function () {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/profile');
            })
        })
}
);

router.post('/upload' , isLoggedIn , upload.single('file'),async function (req,res , next){
    if(!req.file){
        return res.status(404).send('no files were given');
    }
    const user = await userModel.findOne({
        username: req.session.passport.user
    })
    const {filecaption , file} = req.body;
    const post =  await postModel.create({
        postcaption: filecaption,
        image: req.file.filename,
        user:user._id
    })

    user.posts.push(post._id)       
    await user.save()
    res.redirect('/profile');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash:true
}), function (req, res) {});



router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

module.exports = router;