var Event = require('../model/event.js');
var Events = require('../collections/events');

var UserAttendEvents = require('../collections/userAttendEvents.js');
var UserAttendEvent = require('../model/userAttendEvent.js');

var UserInterestEvents = require('../collections/userInterestEvents.js');
var UserInterestEvent = require('../model/userInterestEvent.js');

var jwt = require('jwt-simple');

module.exports = {

  addEvent:function (req, res){
    var event = req.body;
    //what do u  want to be unique??!!
    new Event({eventName: event.eventName}).fetch().then(function(found){
      if(found){
        res.status(500).send("This event is already existed");
      } 
      else{
        Events.create(event).then(function(newEvent){
          console.log(newEvent)
          res.json(newEvent);
        });
      }
    }).catch(function(err){
      res.status(500).send("Unable to add event");
    });

  },

  getAll : function(req,res){
    var result = []; 

    // Events.reset().fetch().then(function(events){
    //   if(events.length){
    //     for(var i = 0; i < events.models.length ; i++){
    //       result.push(events.models[i].attributes)
    //       var eventId = result[i].id;

    //       UserInterestEvent.where({eventId: eventId}).count().then(function(interestedCount){
    //         if(interestedCount){
    //           result[i].peopleInterested = interestedCount;
    //         }

    //             console.log(i)
    //         UserAttendEvent.where({eventId: eventId}).count().then(function(goingCount){
    //           if(goingCount){
    //             result[i].peopleGoing = goingCount;
    //           }
    //           res.json(result)
    //         });

    //       }); 
    //     }
    //   }
    //   else{
    //     res.status(500).send('Unable to find events!');
    //   }
    // });
    // 

    UserAttendEvents.reset().query('where', 'eventId', 1).fetch({withRelated: ['user']}).then(function(result){
      console.log(result.models)
      res.json(result);
    });

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



  getTopCityEvents: function (req, res){
    
  },

  getAllCityEvents: function(req, res){
    var city = req.params.city;
    Events.reset().fetch({city: city}).then(function(cityEvents){
      if(cityEvents.length){
        res.json(cityEvents);
      }
      else{
        res.status(500).send("Unable to find events in ", city);
      }
    });
  },

  editEvent: function (req, res){
    var edit = req.body;

    new Event({id: edit.id}).fetch().then(function(event){
      delete edit['id'];
      event.set(edit);
      event.save();
      res.json("Event is updated");
    }).catch(function(err){
      res.status(500).send("Unable to edit event");
    });
  },

  deleteEvent: function (req, res) {
    var id = req.body.id;
    new Event({id: id}).fetch().then(function(event){
      console.log(event)
      event.destroy();
      res.json("Event deleted.");
    }).catch(function(err){
      res.status(500).send("Unable to delete event");
    });
  },

  getInterestEvents: function (req, res) {

  },

  getGoingEvents: function (req, res) {

  }
};


