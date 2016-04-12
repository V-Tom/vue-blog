//base site CONFIG
"use strict";

const config = require('../../config');

module.exports = {
  app: config.app.subDomain.base,
  apiVersion: config.apiVersion,
  session: config.session,
  cdn: config.cdn,
  path: config.path,
  db: {
    dbBlog: config.db.blog,
    dbUser: config.db.users
  },
  dbSource: config.dbSource
};

