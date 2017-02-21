var Event = require('../model/event.js');
var Events = require('../collections/events');
var jwt = require('jwt-simple');

module.exports = {

  addEvent:function (req, res){
    var decoded = jwt.decode(req.body.tok, 'not your bussines!!')
    var event = req.body;

    new Event(event).fetch().then(function(found){
      if (found){
        res.status(200).send("this event is already existed");
      } 
      else{
        Events.create(event).then(function(newEvent){
          console.log(newEvent)
          res.json(newEvent);
        });
      }
    });
  },

  getAll : function(req,res){
    var tok = jwt.decode(req.query.tok, 'not your bussines!!')
    Events.reset().fetch().then(function(events){
      var Orgevents=[];
      for(var i=0;i<events.models.length;i++){
        if(tok.id===events.models[i].attributes.organizerId){
          Orgevents.push(events.models[i].attributes);
        }
      }
      res.json(Orgevents)
    })
  },

  getAllEventUser : function(req,res){
    var tokk = jwt.decode(req.query.tok, 'not your bussines!!')
    Events.reset().fetch().then(function(events){
      var UserEvents=[];
      for(var i=0;i<events.models.length;i++){
        if(tokk.eventtype===events.models[i].attributes.type){
          UserEvents.push(events.models[i].attributes);
        }
      }
      res.json(UserEvents)
    })
  },



  getTopCityEvents: function (req, res) {

  },

  editEvent: function (req, res) {

  },

  deleteEvent: function (req, res) {

  },

  getInterestEvents: function (req, res) {

  },

  getGoingEvents: function (req, res) {

  }
};


