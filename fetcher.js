const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const localFilePath = process.argv[3];

const downloadInfo = function (url, localFilePath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    if(response.statusCode !== 200) {
      console.log('URL is not valid: ', response.statusCode);
      return;
    }
    
    fs.writeFile(localFilePath, body, (error) => {
      if (error) {
        console.log('Error in saving file: ', error);
        return;
      }

    const fileSize = body.length;
    
    console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
    });
  });
}

downloadInfo(url, localFilePath);