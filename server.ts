// No van los import!
// Mas exactamente no van con express i soket.io
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/js/class', express.static(__dirname + '/js/class'));
app.use('/js/phaser', express.static(__dirname + '/js/phaser'));
app.use('/js/scenes', express.static(__dirname + '/js/scenes'));
app.use('/js/scenes', express.static(__dirname + '/js/scenes'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

server.listen(process.env.PORT || 8080, function () {
    console.log('Listening on ' + server.address().port);
});
