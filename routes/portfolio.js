const express = require('express');
const router = express.Router(); 

router.route('/')
	.get((req, res) => {
		return res.render('portfolio/index', {
			...req.all,
			page: 'portfolio',
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [],
				current: {
					key: 'portfolio',
					title: 'Portfolio'
				}	
			}
		});
	});

router.route('/:id')
	.get((req, res) => {
		return res.render('portfolio/details', {
			...req.all,
			page: 'portfolio',
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [
					{
						key: 'portfolio',
						title: 'Portfolio',
						href: '/portfolio'
					}
				],
				current: {
					key: 'portfolio-details',
					title: 'Portfolio Details'
				}	
			}
		});
	});

module.exports = router;
