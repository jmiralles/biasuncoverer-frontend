const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    var s3 = new aws.S3({
      endpoint: "http://127.0.0.1:9010",
      accessKeyId: "local-identity",
      secretAccessKey: "local-credential",
      s3ForcePathStyle: true
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: "public-read",
        // You'll input your bucket name here
        Bucket: "eurecat-csv",
        Body: stream,
        Key: fileName,
        ContentType: fileType
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = uploadFile;
