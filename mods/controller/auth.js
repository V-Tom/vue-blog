'use strict';
const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require('../../mods/db/db.find'),
  DBHelperInsert = require('../../mods/db/db.insert');

var Json = require('../../mods/jsonWrap');
var dbSource = require('../../config/dbSource');

const authAdmin = function () {
  return new DBHelperFind(dbSource.user).findOne({"name": "admin"})
};

module.exports = {
  auth: {
    authAdmin: authAdmin
  }
};
