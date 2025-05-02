document.addEventListener('DOMContentLoaded', function () {

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





    const schedulingForm = document.getElementById('scheduling-form');

    schedulingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from your form fields
        const name = document.getElementById('booking-form-name').value;
        const phone = document.getElementById('booking-form-phone').value;
        const time = document.getElementById('booking-form-time').value;
        const date = document.getElementById('booking-form-date').value;
        const serviceType = document.getElementById('booking-form-service-type').value;
        const message = document.getElementById('booking-form-message').value;

        // Create the parameters object to send to EmailJS
        const templateParams = {
            'booking-form-name': name,
            'booking-form-phone': phone,
            'booking-form-time': time,
            'booking-form-date': date,
            'booking-form-service-type': serviceType,
            'booking-form-message': message
        };

        // Your EmailJS Service ID and Template ID
        const serviceId = 'service_wxtzhyn'; // our actual Service ID
        const templateId = 'template_nb40sz5'; // our actual Template ID

        emailjs.send(serviceId, templateId, templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                // Optionally display a success message to the user here
                alert('Your scheduling request has been sent successfully!');
                schedulingForm.reset();
            }, function (error) {
                console.log('FAILED...', error);
                // Optionally display an error message to the user here
                alert('There was an error sending your scheduling request. Please try again.');
                schedulingForm.reset();
            });
    });
});