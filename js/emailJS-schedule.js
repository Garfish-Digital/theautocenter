// Reformat the time selection to match form styling
const timeSelect = document.querySelector('#booking-form-time');
console.log("timeSelect: ", timeSelect);
timeSelect.style.color = '#8d8d8d';

timeSelect.addEventListener('change', function () {
    timeSelect.style.color = 'white'; // Change the text color to white
});

// Reformat the aservice type selection to match form styling
const serviceTypeSelect = document.querySelector('#booking-form-service-type');
console.log("serviceTypeSelect: ", serviceTypeSelect);
serviceTypeSelect.style.color = '#8d8d8d';

serviceTypeSelect.addEventListener('change', function () {
    serviceTypeSelect.style.color = 'white'; // Change the text color to white
});

// Reformat the date input to a more readable format
const dateInput = document.getElementById('booking-form-date');

dateInput.addEventListener('change', function() {
  const selectedDate = new Date(this.value);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = selectedDate.toLocaleDateString(undefined, options);
  dateInput.value = formattedDate; // Set the input value to the formatted date
});

document.addEventListener('DOMContentLoaded', function () {

    // Listener & functionality for Scheduling form on reservation.html
    const schedulingForm = document.getElementById('scheduling-form');

    // Select all form fields
    const name = document.getElementById('booking-form-name');
    const area = document.getElementById('booking-form-phone-area');
    const prefix = document.getElementById('booking-form-phone-prefix');
    const line = document.getElementById('booking-form-phone-line');
    const email = document.getElementById('booking-form-email');
    const time = document.getElementById('booking-form-time');
    const date = document.getElementById('booking-form-date');
    const serviceType = document.getElementById('booking-form-service-type');
    const message = document.getElementById('booking-form-message');

    schedulingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from the form fields
        const nameValue = name.value ? name.value.trim() : '';
        const areaValue = area.value ? area.value.trim() : '';
        const prefixValue = prefix.value ? prefix.value.trim() : '';
        const lineValue = line.value ? line.value.trim() : '';
        const emailValue = email.value ? email.value.trim() : '';
        const timeValue = time.value ? time.value.trim() : '';
        const dateValue = date.value ? date.value.trim() : '';
        const serviceTypeValue = serviceType.value ? serviceType.value.trim() : '';
        const messageValue = message.value ? message.value.trim() : '';

        // Check if any of the required fields are empty, then style their border and alert the user
        const borderAlertStyle = '1px solid #fefc10';

        if (!nameValue) {
            name.style.border = borderAlertStyle;
            printAlert('the Name');
            return;
        } else if ((!areaValue || !prefixValue || !lineValue) && !emailValue) {
            area.style.border = borderAlertStyle;
            prefix.style.border = borderAlertStyle;
            line.style.border = borderAlertStyle;
            email.style.border = borderAlertStyle;
            printAlert('either the Phone or Email');
            return;
        } else if (!timeValue) {
            time.style.border = borderAlertStyle;
            printAlert('the Time');
            return;
        } else if (!dateValue) {
            date.style.border = borderAlertStyle;
            printAlert('the Date');
            return;
        } else if (!serviceTypeValue && !messageValue) {
            serviceType.style.border = borderAlertStyle;
            message.style.border = borderAlertStyle;
            printAlert('either the Type of service or Message');
            return;
        }

        // Handle the alert message
        function printAlert(missingField) {
            alert(`Please fill in ${missingField} field.`);
            return;
        }

        // Create the parameters object to send to EmailJS
        const templateParams = {
            'booking-form-name': nameValue,
            'booking-form-phone': `${areaValue}-${prefixValue}-${lineValue}`,
            'booking-form-email': emailValue,
            'booking-form-time': timeValue,
            'booking-form-date': dateValue,
            'booking-form-service-type': serviceTypeValue || '--',
            'booking-form-message': messageValue
        };
        console.log("templateParams: ", templateParams);

        // Your EmailJS Service ID and Template ID
        const serviceId = 'service_wxtzhyn'; // our actual Service ID
        const templateId = 'template_nb40sz5'; // our actual Template ID

        emailjs.send(serviceId, templateId, templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your scheduling request has been sent to The Auto Center!');
                schedulingForm.reset();
            }, function (error) {
                console.log('FAILED...', error);
                alert('There was an error sending your scheduling request. Please try again.');
                schedulingForm.reset();
            });

            timeSelect.style.color = '#8d8d8d';
            serviceTypeSelect.style.color = '#8d8d8d';
    });
});