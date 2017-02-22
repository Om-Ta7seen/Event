var db = require('../config-db');

var knex = require('knex');

var UserAttendEvent = db.Model.extend({
	tableName: 'userAttendEvent',
	hasTimestamps: true
});

module.exports = UserAttendEvent;
