var request = require('request');
var bcrypt = require('bcrypt-nodejs');


exports.hashpass=function(pass,cb){
  bcrypt.hash(pass , null, null, function(err, hash) {
         if(err) { throw new Error(err)};
         cb(hash);
       });
};


exports.comparePass=function(pass,hash,cb){
  bcrypt.compare(pass,hash,function(err, res) {
      if(err) { throw new Error(err)};
      cb(res);
    });
};