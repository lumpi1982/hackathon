var express = require('express');
var app = express();
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);

// Initialize REST endpoints
app.get('/getUser', function(req, res) {
	console.log('Received request: username=', req.query['username']);
	fetchUsers(req, res);
});
app.get('/getAllUser', function(req, res) {
	fetchAllUsers(req, res);
});
app.get('/pushUser', function(req, res) {
	console.log('Received request: username=', req.query['username']);
	saveUser(req, res);
});

// Render user management page (to test REST calls to localhost)
app.get('/userManagement', function(req, res) {
	res.render('usermanagement.html');
});
app.listen(8000);

// Set up DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;

var User = mongoose.model('users', {
	name : String
});

// Users will be fetched from MongoDB by their username
function fetchUsers(req, res) {
	var searchParams = {
		name : req.query['username']
	};

	console.log("Starting search for users: " + JSON.stringify(searchParams));

	User.find(searchParams, function(err, users) {
		if (err)
			return console.error(err);

		console.log(users);
		res.write(JSON.stringify(users));
		res.end();
	});
}

function fetchAllUsers(req, res) {
	User.find(function(err, users) {
		if (err)
			return console.error(err);

		console.log(users);
		res.write(JSON.stringify(users));
		res.end();
	});
}

// Save new user to MongoDB, specifying the user name
function saveUser(req, res) {
	var newUser = new User({
		name : req.query['username']
	});

	console.log("Saving new user to MongoDB: " + JSON.stringify(newUser));

	newUser.save(function(err, newUser) {
		if (err)
			return console.error(err);

		console.log("Saved new user to MongoDB: " + JSON.stringify(newUser));
		res.write("Saved new user to MongoDB!" + JSON.stringify(newUser));
		res.end();
	});
}
