#!/usr/bin/env node

// Module dependencies.
const Debug = require('debug');
const http = require('http');


// Normalize a port into a number, string, or false.
function normalizePort(val) {
	const port = parseInt(val, 10);
	if (isNaN(port)) return val; // named pipe
	if (port >= 0) return port; // port number
	return false;
}


const ExpressServer = function(app, name='app', port=3000) {
	this.app = app;
	this.name = name;
	this.debug = Debug(name + ':server');


	// Get port from environment and store in Express.
	this.port = normalizePort(port);
	this.app.set('port', this.port);
	
	// Create HTTP server.
	this.server = http.createServer(this.app);
	this.server.on('error', this.onError.bind(this));
	this.server.on('listening', this.onListening.bind(this));	
};


// Listen on provided port, on all network interfaces.
ExpressServer.prototype.start = function() {
	console.log('start server');
	this.server.listen(this.port);
};


// Event listener for HTTP server 'listening' event.
ExpressServer.prototype.onListening = function() {
	const addr = this.server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	this.debug('Listening on ' + bind);
};


// Event listener for HTTP server 'error' event.
ExpressServer.prototype.onError = function(error) {
	if (error.syscall !== 'listen') throw error;

	const bind = typeof this.port === 'string'
		? 'Pipe ' + this.port
		: 'Port ' + this.port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
};


module.exports = ExpressServer;