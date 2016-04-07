//base site CONFIG
"use strict";

const config = require('../../../config');

module.exports = {
  app: config.app.subDomain.base,
  apiServer: config.app.subDomain.api.domain,
  apiVersion: config.apiVersion
};
