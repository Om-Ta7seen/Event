var User = require('../model/user.js');
var Users = require('../collections/users');

var Event = require('../model/event.js');
var Events = require('../collections/events.js');

var UserAttendEvent = require('../model/userAttendEvent.js')
var UserAttendEvents = require('../collections/userAttendEvents.js');

var UserInterestEvent = require('../model/userInterestEvent.js')
var UserInterestEvents = require('../collections/userInterestEvents.js')

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
        res.json(newUser);
      });
     }
   });
  },


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


  getUserProfile: function (req, res) {
    var user = req.params.username;
    user.set('password', "")
    var profile = {
      attendEvents: [],
      createdEvents: [],
      interestEvents: []
    };
    profile.user = user

    User.where({username: user}).fetch().then( function (user) {  
      Events.reset().fetch({userId: user.id}).then( function (events) {
        console.log(events)
        profile['createdEvents'].push(events)
      })

      UserAttendEvents.reset().query('where', 'userId', user.id).fetch({withRelated: ['event']}).then(function(result){
        profile['attendEvents'].push(result)
      });

      UserInterestEvents.reset().query('where', 'userId', user.id).fetch({withRelated: ['event']}).then(function(result){
        profile['interestEvents'].push(result)
      });

      res.json(profile);
    })
  }
  };
