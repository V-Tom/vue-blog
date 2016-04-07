'use strict';
var config = require('../config');
var dbSource = config.dbSource;
const path = require('path');
const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert'));

var Json = require(path.join(config.path.modsPath, 'jsonWrap'));
const authAdmin = function () {
  return new Promise((resolve, rejcet)=> {
    setTimeout(function () {
      resolve({
        data: {
          name: "s",
          pwd: "s"
        }
      })
    }, 100);
  });
  //return new DBHelperFind(dbSource.user).findOne({"name": "admin"})
};

module.exports = {
  auth: {
    authAdmin: authAdmin
  }
};
