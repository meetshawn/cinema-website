var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');
    
var users = require('../modules/users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, verify));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.get(id).then(function(user){
    done(null, user);
  }).catch(function(err){
    done(err);
  });
});

function verify(username, password, done) {
  users.getByUsername(username).then(function(user){
    bcrypt.compare(password, user.password, function(err, res) {
      if(err) return error(err);
      if(res) return success(user);
      incorrect();
    });
  }).catch(function(){
    notFound();
  });
  
  function success(user){
    done(null, user);
  }

  function incorrect(err){
    done(null, false, { message: 'Incorrect username or password.' });
  }
  
  function notFound(err){
    done(null, false, { message: 'Incorrect username or password.' });
  }
  
  function error(err){
    done(err);
  }
}

module.exports = passport;