var apiVersion = require('../config').apiVersion;

var Config = {
  "name": "AppConfig",
  "ApiVersion": apiVersion
};

var blogConfig = {
  "apiMap": {
    "getBlogList": {
      "method": "get",
      "url": "api/" + apiVersion + "/blog/list"
    }
  },
  "getBlogListPageSize": 10
};

var articleConfig = {
  "apiMap": {
    "getBlogDetail": {
      "method": "post",
      "url": "api/" + apiVersion + "/blog/detail/"
    }
  }
};

var replyConfig = {
  "apiMap": {
    "addReply": {
      "method": "post",
      "url": "api/" + apiVersion + "/blog/reply/add/"
    },
    "getVerifyCode": {
      "method": "post",
      "url": "api/" + apiVersion + "/tools/getVerifyCode/"
    }
  }
};

//exports
//-----------------------------------
export {
  Config as config,
  blogConfig as blog,
  articleConfig as article,
  replyConfig as reply
}
