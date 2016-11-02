var express = require('express');
var app = express();
var path = require('path');
var port = 8080;
var open = require("open");

app.use(express.static(path.join(__dirname, 'static')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/layerlax.html'));
});

app.listen(port);
open('http://localhost:' + port);
console.log('Express server started at http://localhost:' + port);