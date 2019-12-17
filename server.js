// No van los import!
// Mas exactamente no van con express i soket.io

/**
 * @file Aquí se ejecuta el servidor para poder juegar a nuestro videojuego
 */

/**
 * @typedef { require('express') } app
 */
var express = require('express');
var app = express();

/**
 * @typedef { require('http').Server(app) } server
 */
var server = require('http').Server(app);

/**
 * @typedef { require('socket.io') } io
 */
var io = require('socket.io').listen(server);

/**
 * Load folders
 */
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

/**
 * Load HTML file
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

/**
 * Get up the server on port 8080
 */
server.listen(process.env.PORT || 8080, function () {
    console.log('Listening on ' + server.address().port);
});
