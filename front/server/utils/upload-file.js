const fs = require("fs");

const uploadFile = async ({ filePath }) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      console.log("ERROR", err);
      reject(err);
    });

    stream.on("open", function() {
      console.log("Open Stream");
      readStream.pipe(res);
    });

    stream.on("end", function(e) {
      resolve();
    });
  });
};

module.exports = { uploadFile };
