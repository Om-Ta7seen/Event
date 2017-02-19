var userController = require('./controller/userController.js');
var organizerController = require('./controller/organizerController.js');
var eventController = require('./controller/eventController.js');
module.exports = function (app, express) {

app.post('/api/OrgSignup', organizerController.signup);
app.post('/api/userSignup', userController.userSignup);
app.post('/api/orgProfile', eventController.addEvent);
app.post('/api/userSignin', userController.signin);
app.post('/api/orgSignin', organizerController.signin);



app.get('/api/orgProfile', eventController.getAllEventOrg);
app.get('/api/userProfile', eventController.getAllEventUser)
}