var http          = require('http'),
    path          = require('path'),
    express       = require('express'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    expressValidator = require('express-validator'),
    i18n          = require('i18n');
    
i18n.configure({
  locales: ['en', 'zh'],
  directory: __dirname + '/locales'
});

var app = express();

var passport    = require('./modules/passport'),
    authRoutes  = require('./routes/authentication'),
    movieRoutes = require('./routes/movies');
    checkoutRoutes = require('./routes/checkout');

app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(i18n.init);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  customValidators: {
    isArray: function(value){
      return Array.isArray(value);
    }
  }
}));
app.use(passport.initialize());

app.use(authRoutes);
app.use(movieRoutes);

//app.use(express.static(path.join(__dirname, 'build'))); //TODO: disable for production

var server = http.createServer(app);
server.listen(8888);
