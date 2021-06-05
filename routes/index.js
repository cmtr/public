const express = require('express');
const router = express.Router(); 
const marked = require('marked');
const site = require('../public/site');


router.route('/')
	.get((req, res) => {
		return res.render('index', { 
			title: `CMTr.io - When the going get's weird, the weird turn pro.`,
			...site,
			marked
		});
	});

module.exports = router;
