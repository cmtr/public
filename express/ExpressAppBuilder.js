const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const ExpressAppBuilder = function() {
	this.routes = [];
	this.middleware = [];
};

ExpressAppBuilder.prototype.addMiddleware = function(...args) {
	this.middleware.push(args);
	return this;
};

ExpressAppBuilder.prototype.addRoute = function(path, router) {
	this.routes.push([path, router]);
	return this;
};

ExpressAppBuilder.prototype.build = function() {
	const app = express();

	// view engine setup
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'ejs');

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));

	this.middleware
		.forEach((middleware) => app.use.apply(app, middleware));

	this.routes
		.forEach(route => app.use.apply(app, route));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		next(createError(404));
	});

	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});

	return app;
};

module.exports = ExpressAppBuilder;