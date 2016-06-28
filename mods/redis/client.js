'use strict';
let REDIS_INSTANCE = null;
const getRedis = ()=> {
  if (REDIS_INSTANCE) {
    return REDIS_INSTANCE;
  }
  const redis = require("redis"),

    client = redis.createClient({
      address:"http://139.196.194.79:6379",
      password: "zhangchi123ZC"
    });

  REDIS_INSTANCE = client;

  client.on("error", function (err) {
    console.log(`redis error : ${err}`);
  });

  return REDIS_INSTANCE;
};
module.exports = getRedis();
