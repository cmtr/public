const AppBuilder = require('./express/ExpressAppBuilder');
const Server = require('./express/ExpressServer');
const indexRoute = require('./routes/index');

// Get Environment Variables
const ENV = 'Dev';
const NAME = 'cmtr-public';
const PORT = 3000;

const appBuilder = new AppBuilder();

const app = appBuilder
	.addRoute('/', indexRoute)
	.build();


const server = new Server(app, NAME, PORT);
server.start;