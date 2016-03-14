var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function (req, res, next) {
    res.render('register', {
        title: 'register Demo'
    }, function (err, html) {
        res.send(html);
        res.end();
    });
});


module.exports = router;