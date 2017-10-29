// This file is required by server.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

// Export a function, so that we can pass
// the app and io instances from the server.js file:

module.exports = function(app,io,connection){


	app.get('/',function(req,res){
	    res.render('home',{title : 'Cool Home , huh!', condition: true, anyArray: [1, 2, 3], class: 'active' });
	})

	app.get('/showSignInPage',function(req,res){
	    res.render('signin',{title : 'Cool Test , huh!', condition: false, class2: 'active' });
	})

	app.get('/showSignUpPage',function(req,res){
	  res.render('signup',{title : 'Cool Test , huh!', condition: false, class3: 'active' })
	})

	app.get('/chartjs',function(req,res){
	  res.render('chartjs',{title : 'Cool Test , huh!', condition: false, class4: 'active' })
	})

	app.get('/test/:id/:name',function(req,res){
	  res.json({ query: req.params.id,name: req.params.name});
	})
	app.get('/test',function(req,res){
		 var result_ = [] ;
		connection.query('SELECT * from administration_users_niveaux_acces', function(err, result, fields) {
 	 //connection.end();

 	   if (err) throw err;
     var graph_data = [];
		 var graph_label = [];

 	    //console.log('result' +result[0].id);
			for (i = 0; i < result.length; i++) {
         console.log('result' +result[i].id);
				 graph_data.push(result[i].id);
				 graph_label.push('"'+result[i].nom +'"');
      }
			 console.log('length' +graph_label);
			res.render('test', {title : 'Cool Test , huh!', condition: false, class1: 'active', datausers: result, graph_data: graph_data , graph_label: graph_label })
 	   });

	})

	/*app.get('/chat',function(req,res){
	  res.sendFile('chat.html',{'root':__dirname + '/templates'})
	})*/

	app.get('/filejs',function(req,res){
	  res.sendFile('file.js',{'root':__dirname + '/js'})
	})

	 require('./routerchat')(app, io,gravatar);



	app.get("/usersacces",function(req,res){
	 connection.query('SELECT * from administration_users_niveaux_acces', function(err, rows, fields) {
	 //connection.end();
	 if (!err){
	      var response = [];

	    if (rows.length != 0) {
	      response.push({'result' : 'success', 'items' : rows});
	    } else {
	      response.push({'result' : 'error', 'msg' : 'No Results Found'});
	    }

	    res.setHeader('Content-Type', 'application/json');
	      res.status(200).send(JSON.stringify(response));
	    } else {
	      res.status(400).send(err);
	    }
	   });
	 });


	 app.get("/usersaccess",function(req,res){
	  connection.query('SELECT * from administration_users_niveaux_acces', function(err, rows, fields) {
	  //connection.end();
	  if (!err){
	       var response = [];

	     if (rows.length != 0) {
	       response.push({'result' : 'success', 'data' : rows});
	     } else {
	       response.push({'result' : 'error', 'msg' : 'No Results Found'});
	     }

	     res.setHeader('Content-Type', 'application/json');
	       res.status(200).send(JSON.stringify(response));
	     } else {
	       res.status(400).send(err);
	     }
	    });
	  });



	 app.post('/usersacces/add', function (req,res) {
	 	var response = [];

	 	if (typeof req.body.alias!== 'undefined' &&typeof req.body.nom!== 'undefined'	) {
	 		var alias = req.body.alias, nom = req.body.nom;

	 		connection.query('INSERT INTO administration_users_niveaux_acces (alias, nom) VALUES (?, ?)',
	 			[alias, nom],
	 			function(err, result) {
	 		  		if (!err){

	 					if (result.affectedRows != 0) {
	 						response.push({'result' : 'success'});

	 					} else {
	 						response.push({'msg' : 'No Result Found'});
	 					}
	          // When a client connects, we note it in the console
	          io.sockets.on('connection', function (socket) {
	              //socket.broadcast.emit('message', 'You are connected!');
	              console.log('message '+ 'You are connected!');
	          });
	 					res.setHeader('Content-Type', 'application/json');
	 			    	res.status(200).send(JSON.stringify(response));
	 		  		} else {
	 				    res.status(400).send(err);
	 			  	}
	 			});

	 	} else {
	 		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
	 		res.setHeader('Content-Type', 'application/json');
	     	res.status(200).send(JSON.stringify(response));
	 	}
	 });



	 app.get('/usersacces/:id', function (req,res) {
		var id = req.params.id;

		connection.query('SELECT * from administration_users_niveaux_acces where id = ?', [id], function(err, rows, fields) {
	  		if (!err){
	  			var response = [];

				if (rows.length != 0) {
					response.push({'result' : 'success', 'data' : rows});
				} else {
					response.push({'result' : 'error', 'msg' : 'No Results Found'});
				}

				res.setHeader('Content-Type', 'application/json');
		    	res.status(200).send(JSON.stringify(response));
	  		} else {
			    res.status(400).send(err);
		  	}
		});
	});


	app.delete('/usersacces/delete/:id', function (req,res) {
		var id = req.params.id;

		connection.query('DELETE FROM administration_users_niveaux_acces WHERE id = ?', [id], function(err, result) {
	  		if (!err){
	  			var response = [];

				if (result.affectedRows != 0) {
					response.push({'result' : 'success'});
	        // When a client connects, we note it in the console
	        io.sockets.on('connection', function (socket) {
	          //  socket.broadcast.emit('message', 'You are connected!');
	            console.log('message '+ 'You are connected!');
	        });
				} else {
					response.push({'msg' : 'No Result Found'});
				}


				res.setHeader('Content-Type', 'application/json');
		    	res.status(200).send(JSON.stringify(response));
	  		} else {
			    res.status(400).send(err);
		  	}
		});
	});



	app.post('/usersacces/edit/:id', function (req,res) {
		var id = req.params.id, response = [];

		if (typeof req.body.nom !== 'undefined' &&  typeof req.body.id !== 'undefined' &&  typeof req.body.nombre !== 'undefined'
		) {
			var alias = req.body.alias, nom = req.body.nom, nombre = req.body.nombre ,id = req.body.id;

			connection.query('UPDATE administration_users_niveaux_acces SET  nom = ? ,id = ? WHERE id = ?',
				[nom, nombre, id],
				function(err, result) {
			  		if (!err){

						if (result.affectedRows != 0) {
							response.push({'result' : 'success'});
						} else {
							response.push({'msg' : 'No Result Found'});
						}

	          // When a client connects, we note it in the console
	          io.sockets.on('connection', function (socket) {
	            //  socket.broadcast.emit('message', 'You are connected!');
	              console.log('message '+ 'You are connected!');
	          });

						res.setHeader('Content-Type', 'application/json');
				    	res.status(200).send(JSON.stringify(response));
			  		} else {
					    res.status(400).send(err);
				  	}
				});

		} else {
			response.push({'result' : 'error', 'msg' : 'Please fill required information'});
			res.setHeader('Content-Type', 'application/json');
	    	res.send(200, JSON.stringify(response));
		}
	});



	io.sockets.on('connection', function (socket) {

	  socket.on('messagex', function (message) {
	    socket.message = message;
	    socket.broadcast.emit('message', 'Chart update by '+ socket.message +' successfully');
			io.sockets.connected[socket.id].emit('messagexyz', 'update');
	    console.log('message '+ 'You are connected!');
	      });

	      socket.on('messagexy', function (message) {
	      socket.message = message;
	      io.sockets.connected[socket.id].emit('messagexyz', message);
	      console.log('messagexyz'+ message);
				console.log('messagexyz'+ message);
	          });

						socket.on('typing', function (data) {
                   socket.broadcast.emit('typing', data);
							});




	});


};
