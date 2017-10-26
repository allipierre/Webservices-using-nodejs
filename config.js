// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');

module.exports = function(app, io){

  app.set('port', process.env.PORT || 3000);
  app.use('/node_modules',  express.static(__dirname + '/node_modules'));
	app.use('/style',  express.static(__dirname + '/style'));

};
