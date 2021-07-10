const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const _ = require('lodash');
const fp = require('lodash/fp');
//const marked = require('marked');
const showdown  = require('showdown');
const navigation = require('../public/content/navigation');
const common = require('../public/content/common');
const home = require('../public/content/home');
const about = require('../public/content/about');
const portfolio = require('../public/content/portfolio');
const services = require('../public/content/services');
const publications = require('../public/content/publications');

const converter = new showdown.Converter();
const marked = (md) => converter.makeHtml(md);

// Define base data
const all = {
	marked,
	...common,
	...navigation,
	...about,
	...portfolio,
	...services,
	...home,
	...publications
};

// Define modifications
const contentDir = '../public/content';
const getAbsPath = (relPath) => path
	.join(__dirname, contentDir, relPath)
	.toString();
const readFile = (relPath) => promisify(fs.readFile)(getAbsPath(relPath),'utf-8');
const updateItem = (param) => (item) => readFile(item.path)
	.then((val) => _.set(item, param, val));

Object.freeze(all);

const resolve = (func) => (promise) => promise.then((res) => func(res));

const overrideAbout = (all) => readFile(all.about.text.path)
	.then((body) => _.set(all, 'about.text.body', body));

const overrideAboutBoxes = (all) => Promise
	.all((all).aboutBoxes
		.map(updateItem('paragraph')))
	.then(updated => _.set(all, 'aboutBoxes', updated));

const overrideServiceFeatures = (all) => Promise
	.all(all.features
		.map(updateItem('body')))
	.then((features) => _.set(all, 'features', features));

const overrideArticle = (key) => (all) => Promise
	.all(Object.values(_.get(all, key))
		.map(updateItem('body')))
	.then((arr) => arr.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}))
	.then((publications) => _.set(all, key, publications))
	.catch((err) => {
		console.log(err);
		return all;
	});

// Modification override function list
const modifications = fp.flow(
	overrideAbout,
	resolve(overrideAboutBoxes),
	resolve(overrideServiceFeatures),
	resolve(overrideArticle('publications')),
	resolve(overrideArticle('aboutContent')),
	resolve(overrideArticle('serviceContent'))
);

// Create Singleton Data object
let data = undefined;


// Middleware Function - Add data to request
module.exports = function(req, res, next) {
	const proceed = (result) => {
		if (result !== undefined)
			data = result;
		req.all = data;
		next();
	};

	if (false) proceed();			
	else modifications(all).then(proceed);
};