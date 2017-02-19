var User = require('../model/user.js');
var Users = require('../collections/users');

var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {
		userSignup:function (req,res) {

		  var username   = req.body.username;
          var email      = req.body.email;
          var eventtype  = req.body.eventtype
          console.log(eventtype)
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
	          email     : email,
	          eventtype : eventtype
	        })
	        .then(function(newUser) {
	          var token = jwt.encode(newUser, 'not your bussines!!');
	          res.json({token: token});
	        });
	      }
	  });
	},

 signin : function(req,res) {
  var email      = req.body.email; 
  var password   = req.body.password;
  var hashedpass = util.hashpass(password,function(hash){
      hashedpass = hash;
  });
    new User({ email: email }).fetch().then(function(found) {
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
    console.log("not found")
      }
  });
 }
};
