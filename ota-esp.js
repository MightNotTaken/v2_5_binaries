const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Path to the local file you want to upload
const filePath = './mother-board-new-core.ino.bin'; // Change this to your file path

// Create a FormData instance and append the file
const form = new FormData();
form.append('file', fs.createReadStream(filePath));

// Upload using axios
axios.post('http://192.168.4.1/update', form, {
    headers: form.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`Upload Progress: ${percent}%`);
    }
  })
  
.then(response => {
  console.log('Upload successful:', response.status, response.statusText);
})
.catch(error => {
  console.error('Upload failed:', error.message);
});
