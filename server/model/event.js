var db = require('../config-db');
var userAttendEvent = require('./userAttendEvent.js');
var userIntersetEvent = require('./userInterestEvent.js');

var knex = require('knex');

var Event = db.Model.extend({
	tableName: 'events',
	hasTimestamps: true,
	attend: function () {
        return this.hasMany(userAttendEvent, 'eventId', 'id');
    },
    interest: function () {
        return this.hasMany(userIntersetEvent, 'eventId', 'id');
    }
});

module.exports = Event;



