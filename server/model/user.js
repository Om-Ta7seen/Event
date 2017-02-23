var db = require('../config-db');
var events = require('./event.js');

var knex = require('knex');

var User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	event: function () {
        return this.hasMany(events, 'userId', 'id');
    }
});

module.exports = User;
