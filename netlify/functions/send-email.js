// This Netlify Function handles sending emails using EmailJS.

// Import the EmailJS library
const emailjs = require('@emailjs/nodejs'); // Import the EmailJS Node.js SDK

exports.handler = async function (event, context) {
    // Ensure only POST requests are allowed for security
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ message: 'Method Not Allowed. Only POST requests are accepted.' }),
        };
    }

    try {
        // Parse the incoming request body (it will be JSON from your frontend)
        const formDataFromFrontend = JSON.parse(event.body);

        // Retrieve your EmailJS credentials from Netlify's secure environment variables
        // These keys MUST match the ones you set in Netlify dashboard (EMAILJS_SERVICE_ID, etc.)
        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const templateId = process.env.EMAILJS_TEMPLATE_ID;
        const userId = process.env.EMAILJS_USER_ID;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Optional, if you use a private key

        // Validate that all necessary keys are present
        if (!serviceId || !templateId || !userId || !privateKey) {
            console.error('EmailJS environment variables are not properly set in Netlify. Check SERVICE_ID, TEMPLATE_ID, USER_ID, and PRIVATE_KEY.');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server configuration error: Email service not set up. Missing one or more required API keys.' }),
            };
        }

        // Define the template parameters that your EmailJS template expects
        // Define the template parameters that your EmailJS template expects.
        // The names on the LEFT (e.g., from_name) MUST EXACTLY MATCH the variable names
        // you used in your EmailJS template (e.g., {{from_name}}).
        //
        // The names on the RIGHT (e.g., formDataFromFrontend.fullName)
        // are the actual pieces of data received from your website's form.
        const templateParams = {
            fullName: formDataFromFrontend.fullName || 'N/A',
            email: formDataFromFrontend.email || 'N/A',
            description: formDataFromFrontend.description || 'No description provided',
            serviceCategory: formDataFromFrontend.serviceCategory || 'N/A',
            serviceSubcategory: formDataFromFrontend.serviceSubcategory || 'N/A',
            preferredDate: formDataFromFrontend.preferredDate || 'N/A',
            preferredTime: formDataFromFrontend.preferredTime || 'N/A',
            phone: formDataFromFrontend.phone || 'N/A', // Assuming you have a {{phone_number}} in template

            // NOTE: Direct file uploads usually require more complex handling (e.g., storing on cloud storage)
            // and EmailJS's free tier has limitations. This just tells you if a file was *intended* for upload.
            // mediaUpload: formDataFromFrontend.mediaUpload ? `File Attached: ${formDataFromFrontend.mediaUpload.name}` : 'No file attached',

            // Example of combining data for the email content (optional)
            full_inquiry_details: `
                Service Category: ${formDataFromFrontend.serviceCategory || 'N/A'}
                Subcategory: ${formDataFromFrontend.serviceSubcategory || 'N/A'}
                Description: ${formDataFromFrontend.description || 'No description provided'}
                Preferred Date: ${formDataFromFrontend.preferredDate || 'N/A'}
                Preferred Time: ${formDataFromFrontend.preferredTime || 'N/A'}
                Full Name: ${formDataFromFrontend.fullName || 'N/A'}
                Email: ${formDataFromFrontend.email || 'N/A'}
                Phone: ${formDataFromFrontend.phone || 'N/A'}
            `.trim()
                // File Upload: ${formDataFromFrontend.mediaUpload ? formDataFromFrontend.mediaUpload.name : 'None'}
        };

        await emailjs.send(serviceId, templateId, templateParams, {
            publicKey: userId,
            privateKey: privateKey
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' })
        };

    } catch (error) {
        // Log the error for debugging purposes on Netlify's side
        console.error('Error sending email via Netlify Function:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email. Please try again.', error: error.message || error.toString() }),
        };
    }
};
