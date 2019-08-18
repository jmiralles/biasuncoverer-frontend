
const FormData = require('form-data');
const { request } = require('http');
const { createReadStream } = require('fs');
const uuidv1 = require('uuid/v1');


const sendFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    
    const form = new FormData();
    form.append('file', readStream);
    form.append('name', fuuidv1());

    console.log("SENDFILE",form.getHeaders());
    
    const req = request(
        {
            host: 'localhost',
            port: '3002',
            path: '/api/file/',
            method: 'POST',
            headers: form.getHeaders(),
        },
        response => {
            console.log(response.statusCode); // 200
        }
    );
    
    console.log(req);
     form.pipe(req)
     req.on('response', (res) => {
        resolve(res.statusCode)
      });
});
};

module.exports = sendFile;
