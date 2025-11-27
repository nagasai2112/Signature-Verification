const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Function to simulate signature verification by sending the image to Flask API
const verifySignature = (filePath) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();  // Create form data for POST request
    formData.append('file', fs.createReadStream(filePath));  // Use stream to read the file

    // Send the image to Flask API for inference
    axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: {
        ...formData.getHeaders(),  // Get the necessary headers for the form-data request
      },
    })
    .then(response => {
      // Handle the response from Flask API
      if (response.data.error) {
        reject(response.data.error);
      } else {
        // Extract prediction and confidence from the response
        const { prediction, confidence } = response.data;

        if (prediction && confidence) {
          // Ensure confidence is a numeric value (remove '%' and convert to number)
          const confidenceNumber = parseFloat(confidence.replace('%', '')); // Convert to number
          if (isNaN(confidenceNumber)) {
            reject('Invalid confidence value');
          } else {
            // Print the result as "Genuine" or "Forged" based on the prediction
            const resultMessage = prediction === 'Genuine' ? 'Signature is Genuine' : 'Signature is Forged';
            console.log(resultMessage);
            console.log('Confidence:', confidenceNumber);  // Confidence is now a number
            resolve({
              prediction: resultMessage,
              confidence: confidenceNumber,  // Confidence is now a number
            });
          }
        } else {
          reject('Invalid response from Flask API');
        }
      }
    })
    .catch(error => {
      reject(error.message || error);
    });
  });
};

module.exports = { verifySignature };
