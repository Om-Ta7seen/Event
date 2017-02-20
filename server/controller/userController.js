var User = require('../model/user.js');
var Users = require('../collections/users');
var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {

  signup:function (req,res) {
    var username = req.body.username;
    var hashedpass = util.hashpass(req.body.password,function(hash){
      hashedpass = hash;
    });
    new User({ username: username }).fetch().then(function(found) {
     if (found) {
       res.status(200).send("this user is already existed");
     } else {
       Users.create({
         username  : username,
         password  : hashedpass,
         email     : req.body.email,
         orgName : req.body.orgName,
         fullName: req.body.fullName,
         imgUrl: req.body.imgUrl
       })
       .then(function(newUser) {
        console.log("username in signup    ",newUser);
        var token = jwt.encode(newUser, 'not your bussines!!');
        res.json({username: newUser.username, city: newUser.city, token: token});
      });
     }
   });
  },

  signin : function(req,res) {
    var hashedpass = util.hashpass(password,function(hash){
      hashedpass = hash;
    });

    new User({ username: req.body.username }).fetch().then(function(found) {
      if (found) {
        var userHash = found.get('password');
        util.comparePass(password,userHash,function(exist){
          if(exist){
            var token = jwt.encode(found, 'not your bussines!!');
            res.json({token: token});
          }else{
            res.send("password is not correct");
          }
        })  
      } else {
        console.log("not found");
        res.status(500).send("user not found");
      }
    });
  },

  // getUserProfile: function (req, res) {
  //     // var username =
  //     // var password = 
  //   }
};
