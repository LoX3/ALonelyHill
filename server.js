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
    console.log();
    console.log('CADA VEZ QUE EDITES ESTE FICHERO, HAS DE VOLVER A HACER: NPM START!!!!');
    console.log();

    console.log('Listening on ' + server.address().port);
});

// Doc Emit https://socket.io/docs/emit-cheatsheet/
// Room: https://socket.io/docs/rooms-and-namespaces/

server.lastPlayderID = 0;

io.on('connection', function (socket) {
    socket.on('test', function () {
        io.emit('testOk', 'Test Ok');
    });

    socket.on('newServerPlayer', function () {
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(0, 5),
            y: randomInt(0, 5),
        };

        socket.emit('createPlayer', socket.player);

        socket.emit('getAllEnemies', getAllEnemies(socket.player.id));

        socket.broadcast.emit('newEnemy', socket.player);

        socket.on('movePlayer', function (data) {
            socket.player.x = data.x;
            socket.player.y = data.y;

            io.emit('movePlayerWithForce', {
                id: socket.player.id,
                forceX: data.forceX,
                forceY: data.forceY
            });
        });

        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });

        socket.emit('giveMainCamera');
    });
});

function getAllEnemies(id) {
    var players = [];

    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player && player.id != id) {
            players.push(player);
        };
    });

    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
