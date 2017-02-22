var userController = require('./controller/userController.js');
var eventController = require('./controller/eventController.js');

module.exports = function (app, express) {



app.get('api/topEventsByCity/:city', eventController.getTopCityEvents)

app.post('/api/events', eventController.addEvent);
app.put('/api/events/edit', eventController.editEvent)
app.delete('/api/events/delete', eventController.deleteEvent)
app.get('/api/events', eventController.getAll);

// app.get('/api/events/:city', eventController.getAllCityEvents);

app.get('/api/events/going', eventController.getGoingEvents);
app.get('api/events/interested', eventController.getInterestEvents)

app.post('/api/signup', userController.signup);
app.post('/api/signin', userController.signin);
app.get('/api/users/:username', userController.getUserProfile);
}