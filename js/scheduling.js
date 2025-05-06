const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
const scheduleButton = document.getElementById('scheduling-button');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const step1Div = document.getElementById('step-1');
const step2Div = document.getElementById('step-2');
const step3Div = document.getElementById('step-3');
const step4Div = document.getElementById('step-4');
const step5Div = document.getElementById('step-5');
const step6Div = document.getElementById('step-6');
const step7Div = document.getElementById('step-7');
const steps = [step1Div, step2Div, step3Div, step4Div, step5Div, step6Div, step7Div];
let currentStep = 0;
let formData = {}; // To store the form data

// Event listener for the Service Category buttons
step1Div.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn') && event.target.dataset.category) {
        // Remove highlight from any previously selected button
        const previouslySelected = step1Div.querySelector('.btn-warning');
        if (previouslySelected) {
            previouslySelected.classList.remove('btn-warning', 'text-dark'); // Remove both classes
            previouslySelected.classList.add('btn-outline-primary'); // Revert to primary outline
        }

        const clickedButton = event.target;
        formData.serviceCategory = clickedButton.dataset.category;
        nextBtn.disabled = false;

        // Add yellow highlight to the currently selected button
        clickedButton.classList.remove('btn-outline-primary'); // Remove outline
        clickedButton.classList.add('btn-warning', 'text-dark'); // Add warning background and dark text
    }
});

// Event listener for the "Schedule" button to show the modal
if (scheduleButton) {
    scheduleButton.addEventListener('click', function () {
        serviceModal.show();
        currentStep = 0; // Reset to the first step when the modal is shown
        updateForm(); // Initial update to show the first step and progress
    });
} else {
    console.error("Schedule button with ID 'scheduleButton' not found.");
}

// Event listener for the Date datepicker change
const preferredDateInput = document.getElementById('preferredDate');

if (preferredDateInput) {
    preferredDateInput.addEventListener('input', function () {
        formData.preferredDate = this.value;
        nextBtn.disabled = !this.value;
    });
}

// Event listener for the Time radio buttons
const preferredTimeRadios = document.querySelectorAll('input[name="preferredTime"]');

preferredTimeRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        formData.preferredTime = this.value;
        nextBtn.disabled = false; // Enable Next when a time is selected
    });
});

// Event listener for the Contact inputs
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

function validateStep6() {
    const fullNameValue = fullNameInput?.value.trim();
    const phoneValue = phoneInput?.value.trim();
    const emailValue = emailInput?.value.trim();

    if (fullNameValue && (phoneValue || emailValue)) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

if (fullNameInput) {
    fullNameInput.addEventListener('input', validateStep6);
}

if (phoneInput) {
    phoneInput.addEventListener('input', validateStep6);
}

if (emailInput) {
    emailInput.addEventListener('input', validateStep6);
}

nextBtn.addEventListener('click', function () {

    console.log('Current Step on Next Click:', currentStep); // Check the step value

    if (currentStep === 0) {
        // Logic for Step 1 (Category Selection)
        if (formData.serviceCategory) {
            nextBtn.disabled = false; // Should already be handled by the click listener on step1Div
        } else {
            nextBtn.disabled = true;
        }
    } else if (currentStep === 1) {
        // Logic for Step 2 (Subcategory Selection)
        if (formData.serviceSubcategory) {
            nextBtn.disabled = false; // Should already be handled by the click listener on step2Div
        } else {
            nextBtn.disabled = true;
        }
    } else if (currentStep === 2) {
        // Logic for Step 3 (Description and Media)
        formData.description = document.getElementById('description').value;
        formData.mediaUpload = document.getElementById('mediaUpload').files[0];
        nextBtn.disabled = false; // Enable Next after moving past this step
    } else if (currentStep === 3) {
        // Logic for Step 4 (Preferred Date)
        if (formData.preferredDate) {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    } else if (currentStep === 4) {
        // Logic for Step 5 (Preferred Time)
        const selectedTime = document.querySelector('input[name="preferredTime"]:checked');
        if (selectedTime) {
            formData.preferredTime = selectedTime.value;
        } else {
            formData.preferredTime = null; // Or however you want to represent no selection
        }
        nextBtn.disabled = !selectedTime; // Ensure Next is disabled if no time is selected (e.g., on revisiting the step)
    } else if (currentStep === 5) {
        // Logic for Step 6 (Contact Information)
        const fullName = document.getElementById('fullName')?.value;
        const phone = document.getElementById('phone')?.value;
        const email = document.getElementById('email')?.value;

        formData.fullName = fullName?.trim();
        formData.phone = phone?.trim();
        formData.email = email?.trim();
    }

    currentStep++;
    updateForm();
});

prevBtn.addEventListener('click', function () {
    currentStep--;
    updateForm();
});

submitBtn.addEventListener('click', function () {
    console.log('Form Data:', formData);
    // Here you would send the formData to EmailJS
});

function updateForm() {
    steps.forEach((step, index) => {
        step.classList.toggle('d-none', index !== currentStep);
    });

    progressBar.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
    progressBar.setAttribute('aria-valuenow', (currentStep / (steps.length - 1)) * 100);
    progressBar.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    prevBtn.classList.toggle('d-none', currentStep === 0);
    nextBtn.classList.toggle('d-none', currentStep === steps.length - 1);
    submitBtn.classList.toggle('d-none', currentStep !== steps.length - 1);

    // Reset next button state based on input in the current step
    if (currentStep === 0 && !formData.serviceCategory) {
        nextBtn.disabled = true;
    } else if (currentStep === 1 && !formData.serviceSubcategory) {
        nextBtn.disabled = true;
    } else if (currentStep === 3) {
        // nextBtn.disabled = !document.getElementById('preferredDate').value;
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1; // Month is 0-indexed
        let day = today.getDate();

        // Pad month and day with leading zeros if necessary
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const minDate = `${year}-${month}-${day}`;
        preferredDateInput.setAttribute('min', minDate);
        nextBtn.disabled = !preferredDateInput.value;
    } else if (currentStep === 4) {
        nextBtn.disabled = !document.querySelector('input[name="preferredTime"]:checked');
    } else if (currentStep === 5) {
        validateStep6(); // Call the validation function to check if Next should be enabled
    } else {
        nextBtn.disabled = false; // Enable by default for steps without specific input checks
    }

    // Specific logic for each step
    if (currentStep === 1 && formData.serviceCategory) {
        loadSubcategories(formData.serviceCategory);
    } else if (currentStep === 6) {
        // Populate review details
        document.getElementById('review-category').textContent = formData.serviceCategory || 'Not Selected';
        document.getElementById('review-subcategory').textContent = formData.serviceSubcategory || 'Not Selected';
        document.getElementById('review-description').textContent = formData.description || 'No Description Provided';
        document.getElementById('review-date').textContent = formData.preferredDate || 'Not Selected';
        document.getElementById('review-time').textContent = formData.preferredTime || 'Not Selected';
        document.getElementById('review-name').textContent = formData.fullName || 'Not Provided';
        document.getElementById('review-phone').textContent = formData.phone || 'Not Provided';
        document.getElementById('review-email').textContent = formData.email || 'Not Provided';

        const reviewMediaDiv = document.getElementById('review-media');
        reviewMediaDiv.innerHTML = ''; // Clear previous content
        if (formData.mediaUpload) {
            const mediaInfo = `<p><strong>Uploaded File:</strong> ${formData.mediaUpload.name} (${(formData.mediaUpload.size / 1024).toFixed(2)} KB)</p>`;
            reviewMediaDiv.innerHTML = mediaInfo;
        } else {
            reviewMediaDiv.innerHTML = '<p><strong>Uploaded File:</strong> None</p>';
        }
    }
}

function loadSubcategories(category) {
    let subcategories = [];
    switch (category) {
        case 'brakes':
            subcategories = ['Squealing brakes', 'Grinding brakes', 'Spongy brake pedal', 'Car pulls to one side when braking', 'Brake light is on', 'Other brake issue'];
            break;
        case 'oil':
            subcategories = ['Standard oil change', 'Synthetic oil change', 'High-mileage oil change', 'Diesel oil change', 'Oil leak', 'Other oil service'];
            break;
        case 'tires':
            subcategories = ['Tire rotation', 'Tire balancing', 'Tire repair (puncture)', 'Tire replacement (set of 4)', 'Single tire replacement', 'TPMS issue', 'Other tire service'];
            break;
        case 'inspection':
            subcategories = ['Basic safety inspection', 'Comprehensive inspection', 'Pre-purchase inspection', 'Emissions inspection', 'Other inspection'];
            break;
        case 'battery':
            subcategories = ['Battery testing', 'Battery replacement', 'Charging system check', 'Other battery issue'];
            break;
        case 'engine_transmission':
            subcategories = ['My car won\'t start', 'Engine light is on', 'Engine running poorly', 'Engine/transmission noise', 'Car starts but won\'t move', 'Overheating', 'Transmission slipping', 'Rough shifting', 'Other engine/transmission issue'];
            break;
        case 'scheduled_maintenance':
            subcategories = ['30,000 mile service', '60,000 mile service', '90,000 mile service', 'Other scheduled maintenance'];
            break;
        case 'ac':
            subcategories = ['A/C not blowing cold', 'Heater not blowing hot', 'Strange noises from vents', 'Defroster issues', 'Refrigerant leak', 'Other heat/AC issue'];
            break;
        case 'suspension':
            subcategories = ['Shocks/struts replacement', 'Noisy suspension', 'Rough ride', 'Car sways or leans', 'Steering issues', 'Wheel alignment', 'Other suspension issue'];
            break;
        case 'diagnostics':
            subcategories = ['Check engine light diagnosis', 'ABS light diagnosis', 'Airbag light diagnosis', 'Electrical system diagnosis', 'Other diagnostic service'];
            break;
        case 'describe_issue':
        case 'specific_part':
        default:
            subcategories = ['General inquiry for ' + category];
            break;
    }

    let subcategoryHTML = '<h5 class="mb-3">Select a Subcategory for ' + category + '</h5>';
    subcategories.forEach(subcategory => {
        subcategoryHTML += `<div class="form-check">
            <input class="form-check-input" type="radio" name="subcategory" id="${subcategory.replace(/\s+/g, '-').toLowerCase()}" value="${subcategory}">
            <label class="form-check-label" for="${subcategory.replace(/\s+/g, '-').toLowerCase()}">${subcategory}</label>
        </div>`;
    });
    step2Div.innerHTML = subcategoryHTML;

    // Enable Next button when a subcategory is selected
    step2Div.addEventListener('click', function (event) {
        if (event.target.classList.contains('form-check-input')) {
            formData.serviceSubcategory = event.target.value;
            nextBtn.disabled = false;
        }
    });
    nextBtn.disabled = true; // Disable Next until a subcategory is chosen
}

// EmailJS Service ID and Template ID
const serviceId = 'service_wxtzhyn';
const templateId = 'template_nb40sz5';

// Event listener for the Submit button
submitBtn.addEventListener('click', function () {
    console.log('Submitting Form Data:', formData);

    // Disable the button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    emailjs.send(serviceId, templateId, formData)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            // Optionally display a success message to the user
            alert('Your appointment request has been submitted successfully! We will contact you shortly.');
            serviceModal.hide(); // Close the modal
            submitBtn.disabled = false;
            submitBtn.textContent = 'Book Appointment';
            formData = {}; // Reset form data
            currentStep = 0;
            updateForm(); // Reset the form to the first step
        }, function (error) {
            console.log('FAILED...', error);
            // Optionally display an error message to the user
            alert('There was an error submitting your request. Please try again later.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Book Appointment';
        });
});

// Event listener for the modal close event
// This will ensure that the form resets when the modal is closed
serviceModal._element.addEventListener('hidden.bs.modal', function () {
    // Get the currently focused element
    const focusedElement = document.activeElement;

    // Check if the focused element is within the modal
    if (serviceModal._element.contains(focusedElement)) {
        // If it is, blur it to remove focus
        focusedElement.blur();
    }

    formData = {}; // Reset form data
    currentStep = 0;
    updateForm(); // Reset the form to the first step
});

// Initialize the form to show the first step
updateForm();