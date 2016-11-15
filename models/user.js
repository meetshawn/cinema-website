var thinky = require('thinky')();
    
var type = thinky.type;

var User = thinky.createModel("User", {
  username:     type.string(),
  password:     type.string(),
  email:        type.string().email(),
  phone_number: type.number(),
  address:      type.string(),
  birthday:     type.date()
});

module.exports = User;