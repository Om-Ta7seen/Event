
var Organizer = require('../model/organizer.js');
var Organizers = require('../collections/organizers');

var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {
		signup:function (req,res) {
		  var orgName    = req.body.orgName;
      var email      = req.body.email;
		  var hashedpass = util.hashpass(req.body.password,function(hash){
		      hashedpass = hash;
		  });
	    new Organizer({ orgName: orgName }).fetch().then(function(found) {
	    if (found) {
	      res.status(200).send("this orgName is already existed");
	    } else {
	        Organizers.create({
	          orgName   : orgName,
	          password  : hashedpass,
	          email     : email
         
	        })
	        .then(function(newOrg) {
	          var token = jwt.encode(newOrg, 'not your bussines!!');
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
    new Organizer({ email: email }).fetch().then(function(found) {
    if (found) {
      var userHash = found.get('password');
      util.comparePass(password,userHash,function(exist){
        if(exist){
          var token = jwt.encode(found,'not your bussines!!');
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


