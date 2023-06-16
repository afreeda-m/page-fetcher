const request = require('request');
const fs = require('fs');
const readline = require('readline');

// setup interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = process.argv[2];
const localFilePath = process.argv[3];

const writeFile = function(localFilePath, body) {
  fs.writeFile(localFilePath, body, (error) => {
    if (error) {
      console.log('Error in saving file: ', error);
      return;
    } else {
      // find size of the file
      const fileSize = body.length;
      console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
      process.exit();
    }
  });
};

const downloadInfo = function(url, localFilePath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    if (response.statusCode !== 200) {
      console.log('URL is not valid: ', response.statusCode, response.statusMessage);
      process.exit();
    }

    if (fs.existsSync(localFilePath)) {
      rl.question("The file exists already, do you want to overwrite? (Y/N) ", (answer) => {
        rl.close();
        if (answer.toUpperCase() === 'N') {
          console.log("File not overwitten");
          return;
        } else if (answer.toUpperCase() === 'Y') {
          console.log("File successfully overwritten");
          writeFile(localFilePath, body);
        }
      });
    } else {
      writeFile(localFilePath, body);
    }
  });
};

downloadInfo(url, localFilePath);