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

router.route('/:id')
	.get((req, res) => {
		const publication = req.all.services.serviceContent[req.params.id];
		// TODO - redirect back if not found
		return res.render('publication/details', {
			...req.all,
			page: 'services',
			publication,
			authors: Object.values(req.all.about.team.team),
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [
					{
						key: 'services',
						title: 'Services',
						href: '/services'
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
