var db = require('../config-db');
var UserInterestEvent = require('../model/userInterestEvent');

var UserInterestEvents = new db.Collection();

UserInterestEvents.model = UserInterestEvent;

module.exports = UserInterestEvents;
