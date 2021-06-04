const express = require('express');
const router = express.Router(); 

router.route('/')
	.get((req, res, next) => {
		return res.send('data');
	});

module.exports = router;
