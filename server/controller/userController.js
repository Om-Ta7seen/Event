var User = require('../model/user.js');
var Event = require('../model/event.js');
var UserAttendEvent = require('../model/userAttendEvent.js')
var UserInterestEvent = require('../model/userInterestEvent.js')


var Users = require('../collections/users');
var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {

  signup:function (req,res) {
    var user = req.body;
    util.hashpass(user.password,function(hash){
      user.password = hash;
    });
    new User({ username: user.username }).fetch().then(function(found) {
     if (found) {
       res.status(200).send("this user is already existed");
     } else {
       Users.create(user)
       .then(function(newUser) {
        var token = jwt.encode(newUser, 'not your bussines!!');
        newUser.set("password", "");
        newUser.token = token;
        console.log(newUser.profile + "--------------------")
        res.json(newUser);
      });
     }
   });
  },

// console.log(found)

signin : function(req,res) {
  var user = req.body
  new User({ username: user.username }).fetch().then(function(found) {
    if (found) {
      var userHash = found.get('password');
      util.comparePass(user.password, userHash, function(exist){
        if(exist){
          var token = jwt.encode(found, 'not your bussines!!');
          found.set("password", "");
          found.token = token;
          res.json(found);
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

// Event.where({event}).fetch().then( function () {})

getUserProfile: function (req, res) {
  var user = req.params.username;
  var profile = {
    goingEvents: [],
    createdEvents: [],
    interestedEvents: []
  };
  // var user = req.params.username;
  
  User.where({username: user}).fetch().then( function (user) {
    user.set('password', "")
    profile.user = user
    Event.where({userId: user.id}).fetch().then( function (events) {
      for (var key in profile) {
        if(key === 'createdEvents') {
          profile['createdEvents'].push(events)
        }
      }
    })
    UserAttendEvent.where({userId: user.id}).fetch().then( function (events) {
      for (var key in profile) {
        if(key === 'attendEvents') {
          profile['attendEvents'].push(events)
        }
      }
    })
    UserInterestEvent.where({userId: user.id}).fetch().then( function (events) {
      for (var key in profile) {
        if(key === 'interestEvents') {
          profile['interestEvents'].push(events)
        }
      }
    })
    res.json(profile)
  })
}
};
