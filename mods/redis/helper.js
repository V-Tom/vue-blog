'use strict';
const redis=require('./client');
const defaultExp=60 * 60 * 24 * 7;

const set=(key,value,exp,cb)=>{
  let currentExp,currentCb;
  if(typeof exp === 'function'){
    currentExp=defaultExp;
    currentCb=exp
  }else{
    currentExp=exp;
    currentCb=cb
  }
  redis.set(key,value,'EX',currentExp, () =>{
    currentCb && currentCb();
    })
};

const get=(key)=>{
  return new Promise((resolve,reject)=>{
    redis.get(key,(err,reply)=>{
      if(err){
        reject(err);
      }
      if(reply){
        resolve(reply.toString())
      }
      reject();
    })
  });
};
module.exports={
  get:get,
  set:set
};
