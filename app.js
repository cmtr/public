const AppBuilder = require('./express/ExpressAppBuilder');
const Server = require('./express/ExpressServer');
const indexRoute = require('./routes/index');
const portfolioRoute = require('./routes/portfolio');
const aboutRoute = require('./routes/about');
const servicesRoute = require('./routes/services');

const addData = require('./midleware/addData');

// Get Environment Variables
const ENV = 'Dev';
const NAME = 'cmtr-public';
const PORT = 3000;


const appBuilder = new AppBuilder();
const app = appBuilder
	.addMiddleware(addData)
	.addRoute('/', indexRoute)
	.addRoute('/portfolio', portfolioRoute)
	.addRoute('/about', aboutRoute)
	.addRoute('/services', servicesRoute)
	.build();




const server = new Server(app, NAME, PORT);
server.start();