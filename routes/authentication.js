var express   = require('express'),
    passport  = require('passport'),
    bcrypt = require('bcrypt'),
    randomstring = require("randomstring");

var router = express.Router();

var User = require('../models/user');
var users = require('../modules/users');

const saltRounds = 10;

router.post('/register', function(req, res) {
  req.checkBody('password', 'Invalid postparam').notEmpty();
  req.checkBody('email', 'Invalid postparam').notEmpty().isEmail();
  
  if(req.validationErrors()) return validationErrors();
  
  users.exists(req.body.email).then(function(result){
    if(result) return exists();
    create();
  }); 
  
  function create(){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      users.create({
        password: hash,
        email: req.body.email,
        phone_number: (req.body.phone_number || null),
        address: (req.body.address || null),
        birthday: (req.body.birthday || null)
      }).then(success).catch(error);
    });
  }
  
  function success(){
    res.send('Success');
  }
  
  function exists(){
    res.send('Exists');
  }
  
  function validationErrors(errors){
    res.send('Validation failed');
  }
  
  function error(err){
    res.send('Error');
  }
});

router.post('/forgot-password', function(req, res) {
  req.checkBody('email', 'Invalid postparam').notEmpty().isEmail();
  
  if(req.validationErrors()) return validationErrors();
  
  users.getByUsername(req.body.email).then(function(user){
    var password = randomstring.generate(10);
    
    console.log(user);
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
      user.password = hash;
      user.save().then(function(user){
        //send email
        success()
      }).error(error);
    });
  }).catch(function(){
    notFound();
  });
  
  function success(user){
    console.log(user);
    res.send('Sent.');
  }
  
  function notFound(err){
    res.send('User not found.');
  }
  
  function error(err){
    res.send('Error');
  }
});

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login'
}));

module.exports = router;