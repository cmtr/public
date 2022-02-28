const AppBuilder = require('./express/ExpressAppBuilder');
const Server = require('./express/ExpressServer');
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const servicesRoute = require('./routes/services');
const publicationRoute = require('./routes/publication');
// const portfolioRoute = require('./routes/portfolio');

const addData = require('./midleware/addData');

// Get Environment Variables
const STAGE = process.env.STAGE || 'DEV';
const NAME = process.env.NAME || 'cmtr';
const PORT = process.env.PORT || 3000;


const appBuilder = new AppBuilder();
const app = appBuilder
	.addMiddleware(addData)
	.addRoute('/', indexRoute)
	.addRoute('/about', aboutRoute)
	.addRoute('/services', servicesRoute)
	.addRoute('/publication', publicationRoute)
//	.addRoute('/portfolio', portfolioRoute)
	.build();


const server = new Server(app, NAME, PORT);
server.start();