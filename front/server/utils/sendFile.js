
const FormData = require('form-data');
const { request } = require('http');
const { createReadStream } = require('fs');
const uuidv1 = require('uuid/v1');


const sendFile = async ({ filePath, apiKey}) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    
    const form = new FormData();
    form.append('fileId', readStream);
    form.append('name', uuidv1());

    const headers = Object.assign({
      apiKey
    }, form.getHeaders());
      
    const req = request(
        {
            host: 'localhost',
            port: '3002',
            path: '/api/file/',
            method: 'POST',
            body: form,
            headers
        },
        response => {
            //console.log(response); // 200
        }
    );
    
     console.log("REQUEST=====>>>>", req);
     form.pipe(req)
     req.on('response', (res) => {
        console.log("STATUS", res.statusCode)
        resolve(res.statusCode)
      });
});
};

module.exports = sendFile;
