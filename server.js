'use strict';

var express = require('express');
var morgan = require('morgan');
var app = express();
var path = require('path');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(process.env.PORT || 3000, function() {
	console.log('The server is running on port 3000!');
});