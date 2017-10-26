  var express  = require('express');
	var mysql    = require('mysql');
	var parser   = require('body-parser');



var connection = mysql.createConnection({
   host     : 'db4free.net',
   user     : 'nodepierre',
   password : 'nodepierre',
   database : 'nodepierre'
 });

 try {
 	connection.connect();

 } catch(e) {
 	console.log('Database Connetion failed:' + e);
 }

 var app = express();

 var server = app.listen(process.env.PORT ||3000);
 var io = require('socket.io').listen(server);

 app.use(parser.json());
 app.use(parser.urlencoded({ extended: true }));

 require('./config')(app, io);
 require('./routes')(app, io,connection);
