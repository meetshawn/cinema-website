var express   = require('express'),
    passport  = require('passport'),
    bcrypt = require('bcrypt');

var router = express.Router();

var users = require('../modules/users');

const saltRounds = 10;

router.post('/register', function(req, res) {
  req.checkBody('username', 'Invalid postparam').notEmpty();
  req.checkBody('password', 'Invalid postparam').notEmpty();
  req.checkBody('email', 'Invalid postparam').notEmpty().isEmail();
  
  if(req.validationErrors()) return validationErrors();
  
  users.exists(req.body.username).then(function(result){
    if(result) return exists();
    create();
  }); 
  
  function create(){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      users.create({
        username: req.body.username,
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

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login'
}));

module.exports = router;