var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/event.sqlite')
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('users',function (user){
      user.increments('id').primary();
      user.string('username',255);
      user.string('fullName',255);
      user.string('email',255);
      user.string('city',255);
      user.string('password',255);
      user.string('orgName',255);
      user.string('imgUrl',255);
      user.timestamps();
    }).then(function(table){
      console.log('users table created:\n',table);
    });
  }
});


db.knex.schema.hasTable('events').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('events',function (event){
      event.increments('id').primary();
      event.string('eventName',255);
      event.string('category',255);
      event.string('location',255);
      event.string('city',255);
      event.dateTime('date',255);
      event.string('cost',255);
      event.string('contact',255);
      event.string('link',255);
      event.string('imgUrl',255);
      event.string('desc',255);
      event.integer('userId');
      event.foreign('userId').references('id').inTable('users');
      event.timestamps();
    }).then(function(table){
      console.log('events table created:\n',table);
    });
  }
});

db.knex.schema.hasTable('userAttendEvent').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('userAttendEvent',function (attend){
      attend.increments('id').primary();
      attend.integer('userId');
      attend.integer('eventId');
      attend.foreign('userId').references('id').inTable('users');
      attend.foreign('eventId').references('id').inTable('events');
      attend.timestamps();
    }).then(function(table){
      console.log('userAttendEvent table created:\n',table);
    });
  }
});

db.knex.schema.hasTable('userInterestEvent').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('userInterestEvent',function (interest){
      interest.increments('id').primary();
      interest.integer('userId');
      interest.integer('eventId');
      interest.foreign('userId').references('id').inTable('users');
      interest.foreign('eventId').references('id').inTable('events');
      interest.timestamps();
    }).then(function(table){
      console.log('userInterestEvent table created:\n',table);
    });
  }
});


module.exports = db;