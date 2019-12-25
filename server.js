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
     * @event test Prueba la conexión con el servidor
     */
    socket.on('test', function () {
        io.emit('testOk', 'Test Ok');
    });

    /**
     * @event newServerPlayer Crea y administra al jugador en el servidor
     */
    socket.on('newServerPlayer', function () {
        /**
         * @event getAllEnemies Busca y crea todos los enemigos que hay conectados
         */
        socket.emit('getAllEnemies', getAllEnemies());

        // Crea un jugador que guarda el servidor
        socket.player = {
            id: server.lastPlayderID++,
            x: 0,
            y: 0,
        };

        /**
         * @event newEnemy Añado al jugador como enemigo
         */
        socket.broadcast.emit('newEnemy', socket.player);

        /**
         * @event movePlayer Al mover el jugador, actualizo su posición en el servidor
         */
        socket.on('movePlayer', function (data) {
            socket.player.x = data.x;
            socket.player.y = data.y;

            /**
             * @event moveEnemyWithForce Muevo al jugador aplicado fuerza
             */
            io.emit('moveEnemyWithForce', {
                id: socket.player.id,
                forceX: data.forceX,
                forceY: data.forceY
            });
        });

        /**
         * @event disconnect Al desconectarse el jugador...
         */
        socket.on('disconnect', function () {
            /**
             * @event removeEnemy Borro al jugador de la partida
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

/**
 * Devuelve un numbero aleatorio en un rango
 * @param {Number} low Minimo numero aleatorio
 * @param {Number} high Máximo numero aleatorio
 */
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
