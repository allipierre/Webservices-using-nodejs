var http     = require('http'),
	express  = require('express'),
	mysql    = require('mysql')
	parser   = require('body-parser');


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
 app.use(parser.json());
 app.use(parser.urlencoded({ extended: true }));
 app.set('port', process.env.PORT || 5000);


app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/style',  express.static(__dirname + '/style'));

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});
})

app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/templates'})
})

app.get('/chartjs',function(req,res){
  res.sendFile('chartjs.html',{'root':__dirname + '/templates'})
})



app.get("/usersacces",function(req,res){
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

	if (typeof req.body.alias !== 'undefined' &&typeof req.body.nom !== 'undefined' && typeof req.body.email !== 'undefined'
	) {
		var alias = req.body.alias, nom = req.body.nom, email = req.body.email;

		connection.query('UPDATE administration_users_niveaux_acces SET alias = ?, nom = ?, email = ? WHERE id = ?',
			[alias, nom, email, id],
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

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



// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
