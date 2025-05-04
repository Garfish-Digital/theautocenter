document.addEventListener('DOMContentLoaded', function () {

    // Listener & functionality for Contact form on index.html
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from your form fields
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
     
        // Create the parameters object to send to EmailJS
        const contactParams = {
            'contact-name': name, // Get value from contact-name input
            'contact-email': email, // Get value from contact-email input
            'contact-message': message // Get value from contact-message textarea
          };

        // Your EmailJS Service ID and Template ID
        const serviceId = 'service_wxtzhyn'; // our actual Service ID
        const templateId = 'template_wtpuvmp'; // our actual Template ID

        emailjs.send(serviceId, templateId, contactParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          // Display success message to the user
          alert('Your contact request has been sent successfully!');
          contactForm.reset(); // Clear the form
        }, function(error) {
          console.log('FAILED...', error);
          // Display error message to the user
          alert('There was an error sending your contact request. Please try again.');
          contactForm.reset();
        });
    });

});