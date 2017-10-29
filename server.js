  var express  = require('express');
	var mysql    = require('mysql');
	var parser   = require('body-parser');
  const circle = require('./circle.js');
  var path = require('path');
  var util = require('util');
  var v8 = require('v8');
  var hbs = require('express-handlebars');



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

 var server = app.listen(process.env.PORT ||3000, function(){
   util.log(`Listen on Port 3000`);
 });
 var io = require('socket.io').listen(server);

 app.use(parser.json());
 app.use(parser.urlencoded({ extended: true }));
 require('./config')(app, io, hbs);
 require('./routes')(app, io,connection);

 console.log(__dirname);
 console.log(__filename);
 console.log('The area of a circle of radius 4 is ' + circle.area(4)+ ' ' +circle.circumference(4));
 console.log(`Basename from ${path.basename(__filename)}`);
 console.log(`Dirname from ${path.dirname(__filename)}`);


 util.log(process.argv);
 util.log(v8.getHeapStatistics());
