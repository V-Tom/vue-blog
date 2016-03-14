'use strict';
const Canvas = require('canvas');
class App {
  constructor(length) {
    this.verifyCodeLength = length || 8;
    this._init();
  };

  _init() {
    this.canvas = new Canvas(this.verifyCodeLength * 15, 30);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.verifyCodeLength * 15, 30);
  };

  _getRandomCode() {
    var key = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ1234567890'.split('');
    var code = '', i, length = key.length;
    for (i = 0; i < this.verifyCodeLength; i++) {
      code += key[Math.round(Math.random() * (length - 1))];
    }
    return code;
  };

  _setCodeStyle(code) {
    var ctx = this.ctx;

    ctx.font = '2px serif';
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    var codeList = code.split('');
    for (var i = 0; i < this.verifyCodeLength; i++) {
      ctx.fillText(codeList[i], 15 * i, 20);
    }
    ctx.beginPath();
    ctx.stroke();

  };

  getCodeBase64() {
    var code = this._getRandomCode();
    this._setCodeStyle(code);
    return {
      canvas: this.canvas,
      code: code
    };
  }
}
module.exports = App;
