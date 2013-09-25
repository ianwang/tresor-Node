
var express = require('express')
  , router = require('./routes/router')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	//app.use(express.logger('dev'));
	app.use(express.cookieParser('Secret-of-tresor-Login'));
	app.use(express.cookieSession());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	app.use(express.responseTime());
	app.all('*',function(req, res, next) {
		console.log('[Dev] Api Call -',req.url);
		next();
	});
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

app.get('/', router.index);
app.get('/create', router.create);
app.get('/user', router.user);
app.get('/product/:id', router.product);
app.get('/main', router.index);
app.post('/upload', router.uploadImg);
app.get('/login', router.landing);
app.get('/logout', router.logout);


// connect to python API
app.get('/token_register', router.getToken);
app.get('/action', router.transaction);
app.post('/create', router.createNew);
app.get('/allProduct', router.allProduct);
app.get('/userProduct', router.userProduct);


http.createServer(app).listen(app.get('port'), function(){
  console.log('tresor server now on port ' + app.get('port'));
});