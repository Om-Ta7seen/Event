var db = require('../config-db');

var knex = require('knex');

var User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
});

module.exports = User;
