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

    console.log('Listening on http://localhost:' + server.address().port + '/');
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
     * @property {JSON} data Datos sobre el jugador
     * @property {Number} data.x Posición horizontal del jugador
     * @property {Number} data.y Posición vertical del jugador
     * @property {String} data.animation Animacion del jugador
     * @property {String} data.side Direccion del jugador
     * @property {String} data.butt Culata del arma del jugador
     * @property {String} data.handle Cuerpo del arma del jugador
     * @property {String} data.canon Cañon del arma del jugador
     * @property {String} data.weaponRotation Rotacion del arma
     * @event newServerPlayer 
     */
    socket.on('newServerPlayer', function (data) {
        /**
         * Busca y crea todos los enemigos que hay conectados
         * @event getAllEnemies 
         */
        socket.emit('getAllEnemies', getAllEnemies());

        /**
         * Crea un jugador que guarda el servidor
         * @enum {JSON}
         * @name socket.player
         * @property {Number} id Id del jugador
         * @property {Number} x Posicion horizontal del jugador
         * @property {Number} y Posicion vertical del jugador
         * @property {Number} butt Culata del jugador
         * @property {Number} handle Cuerpo del jugador
         * @property {Number} canon Cañon del jugador
         * @property {Number} weaponRotation Rotación del arma del jugador
         */
        socket.player = {
            id: server.lastPlayderID++,
            x: data.x,
            y: data.y,
            animation: data.animation,
            side: data.side,
            butt: data.butt,
            handle: data.handle,
            canon: data.canon,
            weaponRotation: data.weaponRotation
        };

        /**
         * Añado al jugador como enemigo
         * @event newEnemy 
         */
        socket.broadcast.emit('newEnemy', socket.player);

        /**
         * Al mover el jugador, actualizo su posición en el servidor
         * @property {JSON} data Datos sobre el jugador
         * @property {Number} data.x Posicion horizontal del jugador
         * @property {Number} data.y Posicion vertical del jugador
         * @property {Number} data.weaponRotation Rotación del arma del jugador
         * @event movePlayer 
         */
        socket.on('movePlayer', function (data) {
            socket.player.x = data.x;
            socket.player.y = data.y;
            socket.player.weaponRotation = data.weaponRotation;

            /**
             * Muevo al jugador segun su posición
             * @event movePlayerToPosition 
             */
            io.emit('movePlayerToPositionAndRotation', {
                id: socket.player.id,
                x: data.x,
                y: data.y,
                weaponRotation: data.weaponRotation,
            });
        });

        /**
         * Recibo la bala para enviarla a los enemigos
         * @property {JSON} data Datos de la bala
         * @property {Number} data.x Posicion horizontal de la bala
         * @property {Number} data.y Posicion vertical de la bala
         * @property {String} data.bulletType Tipo de bala que se dispara
         * @property {Number} data.rotation Rotación de la bala
         * @event shootBullet
         */
        socket.on('shootBullet', function (data) {
            /**
             * Envio la bala a los enemigos
             * @event createBullet 
             */
            io.emit('createBullet', {
                id: socket.player.id,
                x: data.x,
                y: data.y,
                bulletType: data.bulletType,
                rotation: data.rotation,
            });
        });

        /**
         * Recibo la animacion del jugador
         * @property {JSON} data Datos de la bala
         * @property {String} data.animation Animación del jugador
         * @property {Boolean} data.side Direccion del jugador
         * @event changeAnimation
         */
        socket.on('changeAnimation', function (data) {
            socket.player.animation = data.animation;

            io.emit('changePlayerAnimation', {
                id: socket.player.id,
                side: data.side,
                animation: data.animation,
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