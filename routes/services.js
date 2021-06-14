const express = require('express');
const router = express.Router(); 

router.route('/')
	.get((req, res) => {
		return res.render('services/index', {
			...req.all,
			page: 'services',
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [],
				current: {
					key: 'services',
					title: 'Services'
				}	
			}
		});
	});

module.exports = router;
