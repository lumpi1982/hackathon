var express = require('express');
var app = express();
// This make a uri end point for the REST call
// http://myhost/emp will return the data
app.get('/users', function(req, res){
  console.log('Received request: username=', req.query['username']);
  fetchUsers(req,res);
  }
);
app.listen(8000);

// Open DB connection
//var databaseUrl = "mongouser:Password1@localhost/mydb"; // "username:password@example.com/mydb"
//var collections = ["users", "reports"]
//var db = require("mongojs").connect(databaseUrl, collections);
var mongojs = require('mongojs');
var db = mongojs('mydb', ['users']);
 
// function registered in the /emp declaration
function fetchUsers(req,res){
	var searchParams = {name: req.query['username']};
	
	console.log("Starting search for users: " + JSON.stringify(searchParams));
	
	db.users.find(searchParams, function(err, users) {
	  console.log("Processing results...");

	  if( err || !users || users.length <= 0) {
		console.log("No users found");
		res.write("No users found");
		res.end();
	  } else {
		  res.write(JSON.stringify(users));
		  res.end();
	  }
	});
}
 
