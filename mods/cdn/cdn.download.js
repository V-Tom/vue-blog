"use strict";
const core = require('./cdn.core');
const QiNiu = require('QiNiu');
class App extends core {
  constructor(brucket) {
    super(brucket);
    this.setCDNKey();
  }

  setCDNKey() {
    QiNiu.conf.ACCESS_KEY = this.ACCESS_KEY;
    QiNiu.conf.SECRET_KEY = this.SECRET_KEY;
  }

  /*
   获取下载文件的地址
   @param=>String {path} 文件在bucket里面的地址
   @return=>String{url} 下载文件的地址
   */

  getDownloadUrl(path) {
    var baseUrl = QiNiu.rs.makeBaseUrl(this.bucket.domain, path);
    if (this.bucket.isPrivate) {
      var policy = new QiNiu.rs.GetPolicy();
      return policy.makeRequest(baseUrl);
    }
  }

  /*
   得到图片的详细信息
   @param=>String {path} 图片在bucket里面的地址
   @return {url}生成访问图片的url
   */

  getImageInfo(path) {
    var url = QiNiu.rs.makeBaseUrl(this.bucket.domain, path);
    var exif = new QiNiu.fop.Exif();
    url = exif.makeRequest(url);
    if (this.bucket.isPrivate) {
      var policy = new QiNiu.rs.GetPolicy();
      return policy.makeRequest(url)
    } else {
      return url;
    }
  }

  /*
   生成缩略图
   @param=>String {path} 图片在bucket里面的地址
   @param=>Number {width} 生成图片的宽度
   @param=>Number {height} 生成图片的高度
   @return {url}生成访问图片的url
   */

  getImageShort(path, width, height) {
    var url = QiNiu.rs.makeBaseUrl(this.bucket.domain, path);
    var iv = new QiNiu.fop.ImageView();
    iv.width = width;
    iv.height = height;
    url = iv.makeRequest(url);
    if (this.bucket.isPrivate) {
      var policy = new QiNiu.rs.GetPolicy();
      return policy.makeRequest(url)
    } else {
      return url;
    }
  }

  /*
   得到图片的Exif
   @param=>String {path} 图片在bucket里面的地址
   @return {url}生成访问图片的url
   */
  getImageExif(path) {
    var url = QiNiu.rs.makeBaseUrl(this.bucket.domain, path);
    var exif = new QiNiu.fop.Exif();
    url = exif.makeRequest(url);
    if (this.bucket.isPrivate) {
      var policy = new QiNiu.rs.GetPolicy();
      return policy.makeRequest(url)
    } else {
      return url;
    }
  }

  /*
   获取文件信息
   @param=>String {bucket} bucket name
   @param=>Strung {path}    文件路径
   @return {hash, fsize, putTime, mimeType}
   @return {err,reference}
   */
  getFileInfo(path) {
    var client = new QiNiu.rs.Client();
    return new Promise((resolve, reject)=> {
      client.stat(bucket, path, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject({
            error: err,
            reference: 'http://developer.qiniu.com/docs/v6/api/reference/codes.html'
          });
        }
      });
    })
  }

}

module.exports = App;
