var thinky = require('thinky')();
    
var type = thinky.type;

var Movie = thinky.createModel("Movie", {
  name:         type.string(),
  description:  type.string(),
  image:        type.string(),
  price:        type.number(),
  release_date: type.date()
});

module.exports = Movie;