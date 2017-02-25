var express = require ('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
var path = require('path')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(__dirname + '/../client'));

app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/files')}));

require('./routes.js')(app , express);

var port = 8080;
app.listen(process.env.PORT || port);

console.log('Server now listening on port' + port);
