var User = require('../models/user');

var users = {};

users.exists = function(username){
  var deferred = new Promise(_exists);
  
  function _exists(resolve, reject){
    User.filter({ email: username }).limit(1).run()
      .then(success)
      .error(error);
    
    function success(users){
      if(users.length == 0) return resolve(false);
      resolve(true);
    }
    
    function error(err){
      reject();
    }
  }
  
  return deferred;
};

users.get = function(id){
  var deferred = new Promise(_get);
  
  function _get(resolve, reject){
    User.get(id).run()
      .then(success)
      .catch(Errors.DocumentNotFound, notFound)
      .error(error);
    
    function success(user){
      resolve(user);
    }
    
    function notFound(err){
      reject(err);
    }
    
    function error(err){
      reject();
    }
  }
  
  return deferred;
};

users.getByUsername = function(username){
  var deferred = new Promise(_get);
  
  function _get(resolve, reject){
    User.filter({ email: username }).limit(1).run()
      .then(success)
      .error(error);
    
    function success(users){
      if(users.length == 0) return reject();
      resolve(users[0]);
    }
    
    function error(err){
      reject();
    }
  }
  
  return deferred;
};

users.create = function(fields){
  var deferred = new Promise(_create);
  
  function _create(resolve, reject){
    var user = new User({
      password: fields.password,
      email: fields.email,
      phone_number: (fields.phone_number || null),
      address: (fields.address || null),
      birthday: (fields.birthday || null)
    });

    user.save()
      .then(success)
      .error(error);
      
    function success(user){
      resolve(user);
    }
    
    function error(err){
      reject();
    }
  }
  
  return deferred;
};

module.exports = users;