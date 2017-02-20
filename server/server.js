var express = require ('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));

require('./routes.js')(app , express);

var port = 8080;
app.listen(process.env.PORT || port);
<<<<<<< HEAD
console.log('Server now listening on port ' + port);
=======
console.log('Server now listening on port' + port);
>>>>>>> 07508e442c4bce5b7ed8a6419d43be5af8870fa6
