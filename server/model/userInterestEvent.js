var db = require('../config-db');

var knex = require('knex');

var UserInterestEvent = db.Model.extend({
	tableName: 'userInterestEvent',
	hasTimestamps: true
});

module.exports = UserInterestEvent;
