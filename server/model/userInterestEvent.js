var db = require('../config-db');
var events = require('./event.js');
var users = require('./user.js');

var knex = require('knex');

var UserInterestEvent = db.Model.extend({
	tableName: 'userInterestEvent',
	hasTimestamps: true,
	event: function () {
        return this.belongsTo(events, 'eventId', 'id');
    },
    user: function () {
        return this.belongsTo(users, 'userId', 'id');
    }
});

module.exports = UserInterestEvent;
