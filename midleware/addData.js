const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const _ = require('lodash');
const fp = require('lodash/fp');
const marked = require('marked');
const navigation = require('../public/content/navigation');
const common = require('../public/content/common');
const home = require('../public/content/home');
const about = require('../public/content/about');
const portfolio = require('../public/content/portfolio');
const services = require('../public/content/services');

const contentDir = '../public/content';
const getAbsPath = (relPath) => path.join(__dirname, contentDir, relPath).toString();

const readFile = (relPath) => {
	const absPath = getAbsPath(relPath);
	return promisify(fs.readFile)(absPath,'utf-8');
};

// Define base data
const all = {
	marked,
	...common,
	...home,
	...navigation,
	...about,
	...portfolio,
	...services
};

Object.freeze(all);

const overrideAbout = () => readFile(about.about.text.path)
	.then((body) => _.set(about, 'about.text.body', body));

const overrideAboutBoxes = () => Promise
	.all(about.aboutBoxes
		.map((item) => readFile(item.path)
			.then((paragraph) => _.set(item, 'paragraph', paragraph))))
	.then(updated => _.set(about, 'about.aboutBoxes', updated));

const overrideServiceFeatures = () => Promise
	.all(services.features
		.map((item) => readFile(item.path)
			.then((body) => _.set(item, 'body', body))))
	.then((features) => _.set(services, 'features', features));

// Modification override function list
const modifications = [
	overrideAbout,
	overrideAboutBoxes,
	overrideServiceFeatures
];

// Executioner function
const execute = (func) => func();

// Create Singleton Data object
let data = undefined;


// Middleware Function - Add data to request
module.exports = function(req, res, next) {
	if (data !== undefined) {
		req.all = data;
		next();			
	} else {
		Promise
			.all(modifications.map(execute))
			.then((arr) => Object.assign({}, all, ...arr))
			.then((result) => {
				data = result;
				req.all = data;
				next();
			});	
	}
};