const marked = require('marked');
const navigation = require('../public/content/navigation');
const common = require('../public/content/common');
const home = require('../public/content/home');
const about = require('../public/content/about');
const portfolio = require('../public/content/portfolio');
const services = require('../public/content/services');


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

module.exports = all;