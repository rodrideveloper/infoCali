var express  = require("express"),
    app      = express(),
    http     = require("http"),
     fs = require('fs');
   
   // mongoose = require('mongoose'); 

   var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}




app.configure(function () {  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain); 
  app.use(app.router); 
   app.use(express.bodyParser());    
    app.use(express.methodOverride());      
    app.use(express.static(__dirname + '/public'));

});

app.get('/', function(req, res) {
  res.send("Hello world!");
});



app.get('/panaderias', function(req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('json/datos.json', 'utf8'));
  
       res.json(obj);
    
 
});

 //routes = require('./routes/tvshows')(app);

/*mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});**/

app.listen(process.env.PORT||3000);