"use strict";
var cdnDownload = require('./cdn.upload');
var config = require('../../config');

var instance = new cdnDownload(config.cdn.bucket.node);

instance.uploadFile('./cdn.upload.js', 'upload.js', false).then(function (result) {
  console.log(result)
}).catch(err=> {
  console.log(err);
});
