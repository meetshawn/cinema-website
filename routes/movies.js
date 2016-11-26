var express = require('express');
var thinky  = require('thinky')();

var router = express.Router(),
    Errors = thinky.Errors,
    r = thinky.r;

var User = require('../models/movie');

router.get('/showing', function(req, res, next) {
  req.checkQuery('id', 'Invalid postparam').notEmpty().isUUID();
  
  if(req.validationErrors()) return error();
  
  Showing.get(req.query.id)
    .then(success)
    .catch(notFound)
    .error(error);
  
  function success(showing){
    res.render('showing', { movie: movie });
  }
  
  function notFound(err){
    res.render('error', { message: 'Not found' });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

router.get('/showings', function(req, res, next) {
  req.checkQuery('movie_id', 'Invalid postparam').notEmpty().isUUID();
  
  if(req.validationErrors()) return error();
  
  Showing.filter({ idMovie: req.query.id }).run()
    .then(success)
    .catch(notFound)
    .error(error);
  
  function success(showings){
    res.render('showings', { movie: movie });
  }
  
  function notFound(err){
    res.render('error', { message: 'Not found' });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

router.get('/movie', function(req, res, next) {
  req.checkQuery('id', 'Invalid postparam').notEmpty().isUUID();
  
  if(req.validationErrors()) return error();
  
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

router.get('/movies', function(req, res, next) {
  req.checkQuery('page', 'Invalid postparam').optional().isInt();
  req.checkQuery('category', 'Invalid postparam').optional().isAlpha();
  req.checkQuery('sort_by', 'Invalid postparam').optional().isAlpha();
  req.checkQuery('order', 'Invalid postparam').optional().isIn(['asc','desc']);
  req.checkQuery('keyword', 'Invalid postparam').optional().isAlpha();
  
  if(req.validationErrors()) return error();
  
  var page = (req.query.page-1)*10 || 0,
      category = req.query.category.toLowerCase() || null;
      order = req.query.order || 'desc',
      sortBy = order == 'asc' ? r.asc(req.query.sort_by) : r.desc('release_date'),
      keyword = req.query.keyword.toLowerCase() || null;
  
  Movie.filter(function(movie){
    var filter = true;
    if(filter && category != null) filter = movie('category').downcase().match(category);
    if(filter && keyword != null) filter = movie('name').downcase().match(keyword);
    return filter;
  }).order_by(sortBy).slice(page, page+10).run()
    .then(success)
    .catch(notFound)
    .error(error);

  
  function success(movies){
    res.json(movies);
  }
  
  function notFound(err){
    res.render('error', { message: 'Not found' });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

module.exports = router;