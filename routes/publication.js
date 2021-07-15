const express = require('express');
const router = express.Router(); 

router.route('/')
	.get((req, res) => {
		return res.render('publication/index', {
			...req.all,
			page: 'publication',
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [],
				current: {
					key: 'publication',
					title: 'Publications'
				}	
			}
		});
	});

router.route('/:id')
	.get((req, res) => {
		const publication = req.all.publications.publications[req.params.id];
		// TODO - redirect back if not found
		return res.render('publication/details', {
			...req.all,
			page: 'publication',
			publication,
			authors: publication.authors,
			breadcrumbs: {
				root: {
					key: 'home',
					title: 'Home',
					href: '/'
				},
				items: [
					{
						key: 'publication',
						title: 'Publications',
						href: '/publication'
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
