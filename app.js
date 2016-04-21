var express  = require("express"),
    app      = express(),
    http     = require("http"),
     fs = require('fs'),
    server   = http.createServer(app);
   // mongoose = require('mongoose'); 

   var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
  
       res.send(obj);
    
 
});

 //routes = require('./routes/tvshows')(app);

/*mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});**/

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});