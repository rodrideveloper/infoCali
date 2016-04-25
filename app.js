var express  = require("express"),
    app      = express(),
   server = require('http').Server(app),
    io = require('socket.io')(server);
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
  res.send("Funcionando..");
});

var users=[];

io.sockets.on('connection', function (socket) {

  console.log("Nueva coneccion");
   //Ingresa al nuevo user en un array
  socket.on('nuevoUser',function(data){     
  console.log("Nueva User");    
      var user={     
          lat:data.lat,
          lon:data.lon
        }
      
        users.push(user);
        console.log(users);
    
    //Envia una lista de todos los usuarios conectados
     io.sockets.emit('listaUsers',users);
 
  });

  socket.on('disconnect', function() {
      console.log('Hasta Pronto!');    

      var i = users.indexOf(socket);

      users.splice(i, 1);
   });

   
});





app.get('/panaderias', function(req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('json/panaderias.json', 'utf8'));  
    console.log("obteniendo panaderias");
       res.json(obj);   
});

app.get('/clearUsers', function(req, res) {
    console.log("Usuarios:"+ users);
    users=[];
    res.redner("Limpiado.. :)");
});




app.get('/bares', function(req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('json/bares.json', 'utf8'));  
    console.log("obteniendo bares");
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

//server.listen(process.env.PORT||3000);
server.listen(process.env.PORT||3000,function(){
  console.log("Server On");
});