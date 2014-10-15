/**
 * New node file
 */
var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	
	res.write("<h2 style='color:green'>Hello Dejan. Testing Node JS in eclipse.</h2>");
	res.end();
}).listen(9091, 'localhost');
