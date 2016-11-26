var express = require('express');
var thinky  = require('thinky')();

var router = express.Router(),
    Errors = thinky.Errors,
    r = thinky.r;
    
var Purchase = require('../models/purchase');
    
router.post('/shop', function(req, res, next) {
  req.checkBody('showing', 'Invalid postparam').notEmpty().isUUID();
  req.checkBody('seats', 'Invalid').notEmpty().isArray();
  
  if(req.validationErrors()) return error();
  
  Showing.get(req.query.showing).update(function(showing){
    var update = {};
    req.query.seats.forEach(function(seat){
      if(!showing('seats')(seat)) return error();
      if(showing('seats')(seat).gt(0)) return taken();
      update[seat] = 1;
    });
    return { seats: update }
  }).run()
    .then(success)
    .catch(notFound)
    .error(error);
  
  function success(showing){
    req.session.cart = req.session.cart.push({}) || [];
    
    res.json(showing);
  }
  
  function taken(){
    res.render('error', { message: 'Seat taken.' });
  }
  
  function notFound(err){
    res.render('error', { message: 'Not found' });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});    

router.get('/cart', function(req, res, next) {
  req.session.cart = req.session.cart || [];
  
  res.render('cart', { cart: req.session.cart });
});

router.post('/cart', function(req, res, next) {
  req.session.cart = req.session.cart || [];
  

});

router.get('/checkout', function(req, res, next) {
  req.session.cart = req.session.cart || [];
  
  if(req.session.cart.length == 0)
    error();
  else
    success();
  
  function success(){
    res.render('checkout', { cart: req.session.cart });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

router.post('/checkout', function(req, res, next) {
  
});

router.get('/purchases', function(req, res, next) {
  Purchase.filter({ idUser: req.user.id })
    .then(success)
    .error(error);
    
  function success(purchases){
    res.render('purchases', { purchases: purchases });
  }
  
  function error(err){
    res.render('error', { message: 'Not found' });
  }
});

module.exports = router;