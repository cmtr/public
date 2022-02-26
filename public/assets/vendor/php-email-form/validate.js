/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

const axios = {
	post: async (url, payload) => {
		console.log('Axios Stub');
		console.log('URL: ' + url);
		console.log('Payload:');
		console.log(payload);
		return {
			status: 200,
			ok: true,
			statusText: 'OK',
			async text() { 
				return this.statusText;
			}
		};
	}
};

/**
 *  Contact Form Submit
 */



(function () {
	"use strict";

	let forms = document.querySelectorAll('.php-email-form');

	forms.forEach( function(e) {
		e.addEventListener('submit', function(event) {
			event.preventDefault();

			let thisForm = this;

			let action = thisForm.getAttribute('action');
			let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
			
			if( ! action ) {
				displayError(thisForm, 'The form action property is not set!');
				return;
			}
			thisForm.querySelector('.loading').classList.add('d-block');
			thisForm.querySelector('.error-message').classList.remove('d-block');
			thisForm.querySelector('.sent-message').classList.remove('d-block');

			let formData = new FormData( thisForm );
			if ( recaptcha ) {
				if(typeof grecaptcha !== "undefined" ) {
					grecaptcha.ready(function() {
						try {
							grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
							.then(token => {
								formData.set('recaptcha-response', token);
								php_email_form_submit(thisForm, action, formData);
							});
						} catch(error) {
							displayError(thisForm, error);
						}
					});
				} else {
					displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
				}
			} else {
				php_email_form_submit(thisForm, action, formData);
			}
		});
	});


	function formDataToJsonString(formData) {
		return JSON
			.stringify(
				Array.from(formData.entries())
					.reduce((acc, [key, val]) => {
						acc[key] = val;
						return acc;
					}, {})
			); 

	}

	function php_email_form_submit(thisForm, action, formData) {
		const config = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: formDataToJsonString(formData)
		};
		// fetch(action, init)
		axios.post(action, config)
			.then(response => {
				console.log(response);
				if( response.ok ) {
					console.log('Right path');
					return response.text();
				} else {
					console.log('Wrong path');
					throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
				}
			})
			.then(data => {
				thisForm.querySelector('.loading').classList.remove('d-block');
				if (data.trim() == 'OK') {
					thisForm.querySelector('.sent-message').classList.add('d-block');
					thisForm.reset(); 
				} else {
					throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
				}
			})
			.catch((error) => {
				displayError(thisForm, error);
			});

	}

	function displayError(thisForm, error) {
		thisForm.querySelector('.loading').classList.remove('d-block');
		thisForm.querySelector('.error-message').innerHTML = error;
		thisForm.querySelector('.error-message').classList.add('d-block');
	}

})();


/**
 *  Newsletter Form Submit
 */

