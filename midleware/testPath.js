
const addData = require('./addData');


const req = {};

const next = () => {
	console.log(req.all.about.text.body);
};

addData(req, undefined, next);