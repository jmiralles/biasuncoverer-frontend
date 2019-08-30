
const FormData = require('form-data');
const { request } = require('http');
const { createReadStream } = require('fs');
const uuidv1 = require('uuid/v1');


const sendFile = async ({ filePath, fileName, apiKey}) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    
    const form = new FormData();
    form.append('file_csv', readStream);
    form.append('file_name', fileName);

    const headers = Object.assign({
      Authorization: apiKey
    }, form.getHeaders());
      
    const req = request(
        {
            path: '/api/file/',
            method: 'POST',
            body: form,
            headers
        },
        response => {
            console.log("FFFF", response.statusCode); // 200
        }
    );

    console.log("REQ HOST", req)
    
     form.pipe(req)
     req.on('response', (res) => {
        console.log("STATUS", res.statusCode)
        resolve(res.statusCode)
      });
});
};

module.exports = sendFile;
