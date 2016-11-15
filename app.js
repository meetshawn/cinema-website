var http          = require('http'),
    path          = require('path'),
    express       = require('express'),
    exphbs        = require('express-handlebars'),
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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(i18n.init);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(passport.initialize());

//Use nginx for production
app.use(express.static(path.join(__dirname, 'static')))

app.use(authRoutes);
app.use(movieRoutes);

var server = http.createServer(app);
server.listen(8888);