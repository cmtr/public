const express = require('express');
const router = express.Router(); 

router.route('/')
	.get(async (req, res) => res.render('about/index', {
		...req.all,
		page: 'about',
		breadcrumbs: {
			root: {
				key: 'home',
				title: 'Home',
				href: '/'
			},
			items: [],
			current: {
				key: 'about',
				title: 'About Us'
			}	
		}
	}));

router.route('/team')
	.get((req, res) => res.render('about/team', {
		...req.all,
		page: 'team',
		breadcrumbs: {
			root: {
				key: 'home',
				title: 'Home',
				href: '/'
			},
			items: [
				{
					key: 'about',
					title: 'About Us',
					href: '/about'
				}
			],
			current: {
				key: 'team',
				title: 'Team'
			}	
		}
	}));

module.exports = router;
