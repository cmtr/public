const express = require('express');
const router = express.Router(); 
const all = require('./data');

router.route('/')
	.get((req, res) => {
		return res.render('portfolio/index', {
			...all,
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
			...all,
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
					title: 'Details'
				}	
			}
		});
	});

module.exports = router;
