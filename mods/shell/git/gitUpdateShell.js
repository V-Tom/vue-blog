'use strict';
const fs = require('fs');
require('shelljs/global');
var File = require('../../tools/file');


module.exports = function (path, message, data) {

  if (!which('git')) {
    echo('Sorry, this script requires git');
    exit(1);
  }
  fs.readdir(path, function (err, files) {
    if (err) {
      console.error(err.stack);
      exit(1);
    } else {
      try {
        var date, localTimePath;

        if (data.postTime && data.postTime.localTime) {
          date = new Date(data.postTime && data.postTime.localTime)
        } else {
          date = new Date();
        }
        localTimePath = date.getFullYear() + '-' + (date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1));

        if (files.indexOf(localTimePath) === -1) {
          exec('mkdir ' + localTimePath);
        }

        cd(path + '/' + localTimePath);

        var fileName = (data.title || 'unknown article title') + '-' + (data.articleId || 'unknown article id');

        File.writeFile(path + '/' + localTimePath + '/' + fileName + '.md', data.content || 'unknown article content').then(()=> {

          exec('git status');

          exec('git add *');

          exec('git commit -m ' + ' \' ' + message.toString() + ' \' ');

          exec('git push origin master');
        })
      }
      catch (err) {
        exit(1);
      }
    }
  });
};


