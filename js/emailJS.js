document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduling-form'); // Replace 'your-form-id' with the actual ID of your form
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
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
        'booking-form-message': message // This will be handled conditionally in the EmailJS template
      };
      console.log("templateParams", templateParams);
  
      // Your EmailJS Service ID and Template ID
      const serviceId = 'service_wxtzhyn'; // Replace with your actual Service ID
      const templateId = 'template_nb40sz5'; // Replace with your actual Template ID
    //   const templateId = 'template_63087gn'; // Replace with your actual Template ID
  
      emailjs.send(serviceId, templateId, templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          // Optionally display a success message to the user here
          alert('Your scheduling request has been sent successfully!');
          form.reset(); // Clear the form
        }, function(error) {
          console.log('FAILED...', error);
          // Optionally display an error message to the user here
          alert('There was an error sending your request. Please try again.');
        });
    });
  });