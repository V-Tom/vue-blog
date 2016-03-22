'use strict';
const express = require('express');
const router = express.Router();

router.get('/session', (req, res)=> {
  res.status(200).json({
    "success": true
  }).end();
});

module.exports = router;

