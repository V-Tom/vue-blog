"use strict";
const Config = require('../../config');
class App {
  constructor(brucket) {
    this.bucket = brucket;
    this.ACCESS_KEY = Config.cdn.ACCESS_KEY;
    this.SECRET_KEY = Config.cdn.SECRET_KEY;

  }

  getCDNKey() {
    return {
      ACCESS_KEY: this.ACCESS_KEY,
      SECRET_KEY: this.SECRET_KEY
    }
  }
}
module.exports = App;
