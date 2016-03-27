'use strict';
const fs = require('fs');

const writeFile = function (filePath, data) {
  return new Promise((resolve, reject)=> {
    var stream = fs.createWriteStream(filePath, {
      flags: 'w',
      defaultEncoding: 'utf8',
      fd: null,
      mode: 0o666
    });

    stream.write(data);

    stream.end();

    stream.on('open', function () {
      console.log(filePath + ' is opened');
    });

    stream.on('data', function (chunk) {
      console.log('got %d characters of string data', chunk.length);
    });

    stream.on('error', function (err) {
      console.error(err.stack);
      reject(err);
    });

    stream.on('finish', function () {
      console.log('write file success!');
      resolve();
    });
  });

};


module.exports = {
  writeFile: function (path, data) {
    return writeFile(path, data);
  }
};
