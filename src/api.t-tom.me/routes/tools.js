'use strict';
const express = require('express');
const router = express.Router();

//var canvas = require('../../mods/verifyCode');
var json = require('../../../mods/jsonWrap');
//
router.get('/getVerifyCode', (req, res)=> {
  //var verifyCanvas = new canvas().getCodeBase64();
  res.status(200).json(json.success({
    //code: verifyCanvas.code,
    code: '1js1Kdy4',
    base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAeCAYAAADnydqVAAAABmJLR0QA/wD/AP+gvaeTAAAFGklEQVRoge3a2atVdRQH8M+9TlfLHHCqTM2hTNSMSm9pGhESGEUPQTZCUH9A79F7vQQFQfRgmRBRGDRQhJQPpdlgQVlZNJqWKZqVV3O4Pay9OdvjPsM+wz2W5wuH+9tn/36/vc5vTd+19qWLLrroooszFMOq3OtFDwbr3GtWst9AkzI1g6IytwNTcBwnhuh5wzEWRyvdLEcPFmIVXsC+Oh4yC/clD3nM0P24FEVkno1FmJn57h98i49wEBdgMeYle8NufIPPcvaciisxBxPxhAoH3gbciovweN7NrIJ7sAD9mF7wIX+JQzpgaJXbiMzfJZ+bhVLgWfyQmbMbe5K9+7ARX1bZ83dswpLk+mSdsjSLy4Vh/1FpQm9mPBY/YZ0IMUWwD4/i6YLrmkUzMu/NjH/Lub8KI4TyqymXUOhRHMpctxsTcFWtSVkFH8KfwgMPN/DAE4Y+9zUj84kKY1iKZViPXwrsOVj2t13oxS14vZ6JZwry+EAnsBQrRVTYXcf8kTnftVvBK7ETv9aa2KpDnSiIyzw8U3DtUszAfozDKCH89hbJVgTXi7D3nFNDeDl6sRyXivR0Lnap7jApV0jPPCV1aVhfIjjBcbwpP20QhGqGiC410QoFL8QlQsFHCq5dJH70k0p5aw3Oa4FcRTAMtwmGvU51Ft6D2zFa5Odjyff9wtArYYfgDDeJc3rHqZ7+Ka7Gxyord2Sy/kV1RolWhOjP8XaDaxeK3JklJe8a+tRxhyiLRooIUg39mI+3lJQLH6hN9D4UZVifiHZZjBEGsKPK+jV4XxXWXI5WHWSjzY2TuBA3ZGT5WxjNUGJAkLWRuAuTK8wbhhXCw/eU3RtUCreVvOsktiTja8ruLRS/uxIDXyDI4BcV7uei0yRrmziM6/CAaBQQdeVQYiOeF6FzNO7B+Jx504WnHaiwTz3l0XYRtWYJ406xWH4ThUhZy0VuLoROK/h7kU8GMA13i/xWK0y2GoOCVG0QYXcs7hXkKYs0xzbTzDkmDJsI9+m+PSrn3tXCKFbixrIPEfLT6ynZhZ1WMHwlSNYn4qAXYG2HZNmFl4QnThCe3Je5n7Ytx9XYpxYB2iY6fwuSvRYLklUJozFXeHH5h3CI9HpSdmGna8/LRJfoMF4V4Wut6BPPxI8dkGknXhONhCmJPOsFgdqfzJkqwuahvA3qwIBQaNpQmSPYeyVUK4keFvwhtxfdaQ9eItqBKXZhazKu9qarFcjuX34O27E5Gc8QSh6BnwWD7XU6SaKUWvKaH+XYIiLFMsE52vIWLk/BvYJIUJ+gzWCU/IM6JJRdLxqReUJmnFe/blbKibNxpzCKN0QIXibY/3jhzauVwvkNopSqhoOCEfeqHp6bQtaK+0QnZZVSHJ8qLHdAdQvrFQTgON4r8Pz5IrecLxQzX7DLV9QX/hqReU4y/wolA58rlLRX5MZJuFZ4b2ow40UpMyDq2Zmilu1Pvt8qWPZefC06VbXq4mO4WBhNo1iVyLy11sRmMAKP4KGC61ID6xOKOaeVQrUZPaJenqxkKGMqT89Fv/D2tqFVJCtll0XzSFpuHFG8zdlpDDq9Xi/yRqtHRJENLZMoB60iWWnuKZI3z0aMVQr5S0WOb5SJ14VGPXga7hf9102CsAyKRnkX+ZiGB5PxXpHTn2r3QxtV8AlBIFaI3Jn+W0s970/PVhwVZGiUcIiXFXhp0AkMF73UKdpfs/5f0CeYdl+tiV100UUXXXTRxX8b/wJ7lwk8cNABwwAAAABJRU5ErkJggg=='
    //base64: verifyCanvas.canvas.toDataURL()
  })).end();
});


module.exports = router;
