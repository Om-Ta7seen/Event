var userController = require('./controller/userController.js');
var eventController = require('./controller/eventController.js');

module.exports = function (app, express) {

app.post('/api/signup', userController.signup);
app.post('/api/signin', userController.signin);
app.post('/api/profile', eventController.addEvent);

// app.get('/api/users/:username', userController.getUserProfile);
// app.get('/api/attending-Events', eventController.getAllAttendingEvents);
// app.get('/api/interesting-In-Events', eventController.getAllInterestingInEvents);
// app.get('api/same-City-Events', eventController.getSameCityEvents)
}