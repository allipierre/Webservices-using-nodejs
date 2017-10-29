// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');

module.exports = function(app, io, hbs, path){

  app.set('port', process.env.PORT || 3000);
  app.use('/node_modules',  express.static(__dirname + '/node_modules'));
	// Initialize the ejs template engine
	app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
  //app.set('views', path.join(__dirname, 'views'));
  app.use('/views',  express.static(__dirname + '/views'));
  console.log('path' +__dirname);
  app.set('view engine','hbs');
	app.use('/style',  express.static(__dirname + '/style'));
	app.use('/js',  express.static(__dirname + '/js'));

};
