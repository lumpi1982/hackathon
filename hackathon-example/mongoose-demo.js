var express = require('express');
var app = express();
// This make a uri end point for the REST call
// http://myhost/emp will return the data
app.get('/getUser', function(req, res){
  console.log('Received request: username=', req.query['username']);
  fetchUsers(req,res);
  }
);

app.get('/pushUser', function(req, res){
	  console.log('Received request: username=', req.query['username']);
	  saveUser(req,res);
	  }
);
app.listen(8000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;

var User = mongoose.model('users', { name: String });
 
// function registered in the /emp declaration
function fetchUsers(req,res){
	var searchParams = {name: req.query['username']};
	
	console.log("Starting search for users: " + JSON.stringify(searchParams));
	
	User.find(searchParams, function (err, users) {
		  if (err) return console.error(err);
		  
		  console.log(users);
		  res.write(JSON.stringify(users));
		  res.end();
		});
}
 

//function registered in the /emp declaration
function saveUser(req,res){
	var newUser = new User({ name: req.query['username'] });
	
	console.log("Saving new user to MongoDB: " + JSON.stringify(newUser));
	
	newUser.save(function (err, newUser) {
		  if (err) return console.error(err);
		  
		  console.log("Saved new user to MongoDB: " + JSON.stringify(newUser));
		  res.write("Saved new user to MongoDB!" + JSON.stringify(newUser));
		  res.end();
		});
}
