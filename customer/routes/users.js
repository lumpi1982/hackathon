var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res) {
	res.json({ email: 'asdf@asdf.com', password: 'Password1' });	
});

router.post('/', function(req, res) {
	console.log("got something " + req.body.value);
	res.json({ email: 'asdf@asdf.com', password: 'Password1' });
});

router.route('/movies').post(function(req, res) {
	  var movie = new Movie(req.body);
	 
	  movie.save(function(err) {
	    if (err) {
	      return res.send(err);
	    }
	 
	    res.send({ message: 'Movie Added' });
	  });
	});

module.exports = router;
