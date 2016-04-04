'use strict';
var config = require('../config');
const path = require('path');
const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert'));

var Json = require(path.join(config.path.modsPath, 'jsonWrap'));
var dbSource = require('../config/dbSource');

const authAdmin = function () {
  return new DBHelperFind(dbSource.user).findOne({"name": "admin"})
};

module.exports = {
  auth: {
    authAdmin: authAdmin
  }
};
