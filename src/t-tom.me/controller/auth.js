'use strict';
var config = require('../config');
var dbSource = config.dbSource;
const request = require('request');
const path = require('path');

const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert'));
var logger = require(path.join(config.path.modsPath, "logger"));


const authAdmin = () => {
  return new DBHelperFind(dbSource.user).findOne({"name": "admin"})
};

const GitHubAccess = (code)=> {
  return new Promise((resolve, reject)=> {
    let access = config.userAccess.GitHub;
    request({
      "method": "POST",
      "uri": "https://github.com/login/oauth/access_token",
      "headers": {
        "Accept": "application/json"
      },
      "form": {
        "client_id": access.client_id,
        "client_secret": access.client_secret,
        "code": code
      }
    }, (tokenErr, tokenResponse, body) => {
      if (tokenErr) {
        reject(tokenErr);
      }
      if (!tokenErr && tokenResponse.statusCode == 200) {
        try {
          let token = JSON.parse(body);
          request.get({
            "method": "GET",
            "uri": `https://api.github.com/user?access_token=${token.access_token}`,
            "headers": {
              "User-Agent": "Awesome-Octocat-App"
            }
          }, (userErr, UserResponse, body)=> {
            if (userErr) {
              reject(userErr);
            }
            if (!userErr && UserResponse.statusCode == 200) {
              let userInfo = JSON.parse(body);
              new DBHelperFind(config.dbSource.replyUser).findOneAndUpdate({"id": userInfo.id}, userInfo).catch(ex=> {
                logger.server.serverError(ex);
              });
              resolve(userInfo);
            }
          })
        } catch (ex) {
          reject(ex);
        }
      }
    })
  });
};

module.exports = {
  auth: {
    authAdmin: authAdmin,
    GitHubAccess: GitHubAccess
  }
};
