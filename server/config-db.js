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
      user.string('username',100);
      user.string('fullName',100);
      user.string('email',100);
      user.string('password',255);
      user.string('orgName',100);
      user.string('imgUrl',100);
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
      event.string('eventName',100);
      event.string('category',100);
      event.string('location',100);
      event.string('city',100);
      event.dateTime('date',100);
      event.string('cost',100);
      event.string('contact',100);
      event.string('link',100);
      event.string('imgUrl',100);
      event.string('desc',100);
      event.integer('userId');

      event.timestamps();
    }).then(function(table){
      console.log('events table created:\n',table);
    });
  }
});

db.knex.schema.hasTable('userAttendEvent').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('users',function (user){
      user.increments('id').primary();
      user.string('userId',100).foreign().referencesColumn('id').inTable('users');
      user.string('eventId',100).foreign().referencesColumn('id').inTable('users');
      user.timestamps();
    }).then(function(table){
      console.log('users table created:\n',table);
    });
  }
});

db.knex.schema.hasTable('userInterestEvent').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('users',function (user){
      user.increments('id').primary();
      user.string('userId',100).foreign().referencesColumn('id').inTable('users');
      user.string('eventId',100).foreign().referencesColumn('id').inTable('users');
      user.timestamps();
    }).then(function(table){
      console.log('users table created:\n',table);
    });
  }
});



module.exports = db;