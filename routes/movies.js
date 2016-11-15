var express = require('express');
var thinky  = require('thinky')();

var router = express.Router(),
    type   = thinky.type,
    Errors = thinky.Errors;

var Movie = thinky.createModel("Movie", {
  name:         type.string(),
  description:  type.string(),
  image:        type.string(),
  price:        type.number()
}); 

router.get('/movie', function(req, res, next) {
  if(!req.query.id){
    return res.render('error', { message: 'testing 123' });
  }
  
  Movie.get(req.query.id)
    .then(success)
    .catch(notFound)
    .error(error);

  
  function success(movie){
    res.render('movie', { movie: movie });
  }
  
  function notFound(err){
    res.render('error', { message: 'Not found' });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

module.exports = router;