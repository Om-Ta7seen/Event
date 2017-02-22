var db = require('../config-db');
var UserAttendEvent = require('../model/userAttendEvent');

var UserAttendEvents = new db.Collection();

UserAttendEvents.model = UserAttendEvent;

module.exports = UserAttendEvents;
