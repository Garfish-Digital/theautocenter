// functions/send-email.js

// Import the EmailJS library
const emailjs = require('@emailjs/nodejs'); // Import the EmailJS Node.js SDK

// This is the main handler function that Netlify will execute
exports.handler = async function(event, context) {
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

    // OLD
    // const { from_name, from_email, message } = JSON.parse(event.body);

    // Retrieve your EmailJS credentials from Netlify's secure environment variables
    // These keys MUST match the ones you set in Netlify dashboard (EMAILJS_SERVICE_ID, etc.)
const serviceId = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
// We are now getting the PRIVATE KEY from environment variables
const privateKey = process.env.EMAILJS_PRIVATE_KEY;

console.log('DEBUG: privateKey from environment:', privateKey);

    // const serviceId = process.env.EMAILJS_SERVICE_ID;
    // const templateId = process.env.EMAILJS_TEMPLATE_ID;
    // const userId = process.env.EMAILJS_USER_ID; // Your EmailJS Public Key

    // Basic validation: ensure credentials are set
    if (!serviceId || !templateId || !privateKey) {
      console.error('EmailJS environment variables are not properly set in Netlify.');
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Server configuration error: Email service not set up.' }),
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
    // Basic Contact Info for EmailJS template
    fullName: formDataFromFrontend.fullName || 'N/A', // Use fullName from frontend, fallback to N/A
    email: formDataFromFrontend.email || 'N/A',   // Use email from frontend, fallback to N/A
    // 'message' often contains the main inquiry, we'll combine details here
    description: formDataFromFrontend.description || 'No description provided', // Use description as main message

    // --- NEW: Add other form fields from scheduling.js formData to your EmailJS template ---
    // You MUST ensure your EmailJS template has matching variables for these, e.g., {{service_category}}
    serviceCategory: formDataFromFrontend.serviceCategory || 'N/A',
    serviceSubcategory: formDataFromFrontend.serviceSubcategory || 'N/A',
    preferredDate: formDataFromFrontend.preferredDate || 'N/A',
    preferredTime: formDataFromFrontend.preferredTime || 'N/A',
    phone: formDataFromFrontend.phone || 'N/A', // Assuming you have a {{phone_number}} in template

    // If you handle media uploads, you might send a placeholder or URL.
    // For now, we'll just indicate if a file was attached.
    // NOTE: Direct file uploads usually require more complex handling (e.g., storing on cloud storage)
    // and EmailJS's free tier has limitations. This just tells you if a file was *intended* for upload.
    mediaUpload: formDataFromFrontend.mediaUpload ? `File Attached: ${formDataFromFrontend.mediaUpload.name}` : 'No file attached',

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
        File Upload: ${formDataFromFrontend.mediaUpload ? formDataFromFrontend.mediaUpload.name : 'None'}
    `.trim()
};

    // OLD
    // const templateParams = {
    //   from_name: from_name,
    //   from_email: from_email,
    //   message: message,
      // IMPORTANT: Add any other variables that your EmailJS template uses (e.g., 'subject', 'to_name')
      // For example: to_name: 'Garfish Digital Team',
      //              subject: 'New Inquiry from Website',
    // };

    // Initialize EmailJS with your User ID (Public Key)
    // This links the request to your EmailJS account
    // emailjs.init(userId);

    // Send the email using the securely retrieved IDs and parameters
// Pass the private key in an object for server-side authentication
await emailjs.send(serviceId, templateId, templateParams, { privateKey: privateKey });

    // await emailjs.send(serviceId, templateId, templateParams, userId);
    // await emailjs.send(serviceId, templateId, templateParams);

    // If successful, return a 200 OK response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };

  } catch (error) {
    // Log the error for debugging purposes on Netlify's side
    console.error('Error sending email via Netlify Function:', error);

    // Return an error response to the frontend
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email. Please try again.', error: error.message || error.toString() }),
    //   body: JSON.stringify({ message: 'Failed to send email. Please try again.', error: error.message }),
    };
  }
};