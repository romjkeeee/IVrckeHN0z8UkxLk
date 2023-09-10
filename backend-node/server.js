const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();

// Middleware for parsing JSON and handling CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/validate', (req, res) => {
    // Extract data from the request body
    const { childName, gender } = req.body;

    // Validate the data (replace this with your validation logic)
    const errors = [];
    // Define a regular expression pattern for valid names
    const validNamePattern = /^[A-Za-z\s]+$/;

    // Check if the name contains no special characters, numbers, and does not contain ' and '
    if (!validNamePattern.test(childName) || /\d/.test(childName) || /\band\b/i.test(childName)) {
        errors.push('Child\'s name must be a one child\'s name and contain no special characters or numbers');
    }


    if (!childName || childName.length < 2) {
        errors.push('Child\'s name must be at least 2 characters long.');
    }


    if (gender !== 'male' && gender !== 'female') {
        errors.push('Invalid gender.');
    }

    // Prepare the response data
    const responseData = {
        errors: errors.length > 0 ? errors : null,
        validatedData: {
            childName,
            gender,
        },
    };

    // Respond with JSON data
    console.log('Response data:', responseData);

    // Respond with JSON data
    res.json(responseData);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
