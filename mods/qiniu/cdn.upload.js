"use strict";
const core = require('./cdn.core');
const QiNiu = require('QiNiu');
class App extends core {
  constructor(brucket, hash) {
    super(brucket);
    this.hash = hash;
    this.setCDNKey();
  }

  setCDNKey() {
    QiNiu.conf.ACCESS_KEY = this.ACCESS_KEY;
    QiNiu.conf.SECRET_KEY = this.SECRET_KEY;
  }

  /*
   获取上传文件的TOKEN
   @param {String} {bucket} bucket name
   @param=>Object {callbackUrl,callbackBody,returnUrl,returnBody,asyncOps,expires}
   @return {token}
   @reference:http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html#io-put-policy
   */
  getUploadToken(options, fileName) {
    var key, putPolicy = {};
    if (options) {
      for (key in options) {
        if (options.hasOwnProperty(key)) {
          putPolicy[key] = options[key]
        }
      }
    }
    putPolicy['scope'] = this.bucket.name + ':' + fileName;
    putPolicy['insertOnly'] = 0;
    putPolicy = new QiNiu.rs.PutPolicy2(putPolicy);
    return putPolicy.token();
  };

  /*
   上传文件--设置默认覆盖上传
   @param {String}  localFile 本地文件地址
   @param {String}  fileName 上传到服务器上的自定义文件名称
   @param {String}  isBuffer 是上传文件还是二进制流
   @param {Object} {params,mimeType,crc32,checkCrc} 上传参数
   @param {Object} {callbackUrl,callbackBody,returnUrl,returnBody,asyncOps,expires} token参数
   */

  uploadFile(localFile, fileName, isBuffer, uploadOptions, PutPolicyOptions) {

    var item, uploadToken, extra = new QiNiu.io.PutExtra();
    if (uploadOptions) {
      for (item in uploadOptions) {
        if (uploadOptions.hasOwnProperty(item)) {
          extra[item] = uploadOptions[item]
        }
      }
    }
    uploadToken = this.getUploadToken(PutPolicyOptions, fileName);
    return new Promise(function (resolve, reject) {
      QiNiu.io[isBuffer ? 'put' : 'putFile'](uploadToken, fileName, localFile, extra, function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject({
            err: err,
            type: isBuffer ? 'put' : 'putFile',
            reference: '// http://developer.qiniu.com/docs/v6/api/reference/codes.html'
          });
        }
      });
    });
  }
}
module.exports = App;
