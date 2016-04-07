//dev.t-tom.me CONFIG
"use strict";

const config = require('../../config');
module.exports = {
  app: config.app.subDomain.dev,
  devVersion: config.devVersion,
  session: config.session,
  path: config.path,
  db: {
    dbBlog: config.db.blog,
    dbUser: config.db.users
  },
  dbSource: config.dbSource
};

