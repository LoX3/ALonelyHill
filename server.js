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

    /**
     * Prueba la conexión con el servidor
     * @event test
     */
    socket.on('test', function () {
        io.emit('testOk', 'Test Ok');
    });

    /**
     * Crea y administra al jugador en el servidor
     * @event newServerPlayer 
     */
    socket.on('newServerPlayer', function (data) {
        /**
         * Busca y crea todos los enemigos que hay conectados
         * @event getAllEnemies 
         */
        socket.emit('getAllEnemies', getAllEnemies());

        // Crea un jugador que guarda el servidor
        socket.player = {
            id: server.lastPlayderID++,
            x: data.x,
            y: data.y,
            butt: data.butt,
            handle: data.handle,
            canon: data.canon,
        };

        /**
         * Añado al jugador como enemigo
         * @event newEnemy 
         */
        socket.broadcast.emit('newEnemy', socket.player);

        /**
         * Al mover el jugador, actualizo su posición en el servidor
         * @event movePlayer 
         */
        socket.on('movePlayer', function (data) {
            socket.player.x = data.x;
            socket.player.y = data.y;

            /**
             * Muevo al jugador segun su posición
             * @event movePlayerToPosition 
             */
            io.emit('movePlayerToPosition', {
                id: socket.player.id,
                x: data.x,
                y: data.y
            });
        });

        /**
         * Al desconectarse el jugador...
         * @event disconnect 
         */
        socket.on('disconnect', function () {
            /**
             * Borro al jugador de la partida
             * @event removeEnemy 
             */
            io.emit('removeEnemy', socket.player.id);
        });
    });
});

/**
 * Obtiene todos los jugadores enemigos del servidor
 */
function getAllEnemies() {
    var players = [];

    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) {
            players.push(player);
        };
    });

    return players;
}