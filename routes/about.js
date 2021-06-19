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
		page: 'about',
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

router.route('/:id')
	.get((req, res) => {
		const publication = req.all.aboutContent[req.params.id];
		// TODO - redirect back if not found
		return res.render('publication/details', {
			...req.all,
			page: 'about',
			publication,
			authors: req.all.team.team,
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
					key: 'publication-details',
					title: 'Details'
				}	
			}
		});
	});
	
module.exports = router;
