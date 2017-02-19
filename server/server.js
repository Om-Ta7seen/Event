var express = require ('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));


app.post('/api/signup', userController.userSignup);
app.post('/api/signin', userController.signin);
app.post('/api/profile', eventController.addEvent);



app.get('/api/profile', eventController.getAllEventOrg);
 

var port = 8080;
app.listen(process.env.PORT || port);
console.log('Server now listening on port' + port);
