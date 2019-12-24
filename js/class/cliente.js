/**
 * @class Parte cliente del videojuego
 */
class Cliente {
    /**
     * @constructor Constructor de la clase Cliente
     */
    constructor() {
        this.init();
        this.serverInfo();
        this.playerInfo();
        this.allPlayersInfo();
    }

    /**
     * @function init Init es la primera función que se llama cuando se
     * inicia su estado. Se llama antes de precargar, crear o cualquier
     * otra cosa. Si necesita enrutar el juego a otro estado, puede
     * hacerlo aquí, o si necesita preparar un conjunto de variables u
     * objetos antes de que comience la precarga.
     */
    init() {
        /**
         * @type {Object} Guarda una coneción con el servidor
         */
        this.socket = io.connect();
    }

    sendTest() {
        console.log('Client sending...');
        this.socket.emit('test');
    }

    serverInfo() {
        this.socket.on('testOk', function (data) {
            console.log(data);
        });
    }

    askNewPlayer() {
        console.log('Client: Creating player...');

        this.socket.emit('newServerPlayer');
    }

    playerInfo() {
        this.socket.on('createPlayer', function (data) {
            game.scene.getScene('ScenePreload').addNewPlayer(data.id, data.x, data.y);
        });

        this.socket.on('newEnemy', function (data) {
            game.scene.getScene('ScenePreload').addNewEnemy(data.id, data.x, data.y);
        })
    }

    allPlayersInfo() {
        this.socket.on('getAllEnemies', function (data) {
            for (var i = 0; i < data.length; i++) {
                game.scene.getScene('ScenePreload').addNewEnemy(data[i].id, data[i].x, data[i].y);
            }

            cliente.socket.on('movePlayerWithForce', function (data) {
                if (game.scene.getScene('ScenePreload').enemies[data.id]) {
                    game.scene.getScene('ScenePreload').enemies[data.id].movePlayerWithForce(data.forceX, data.forceY);
                }
            });

            cliente.socket.on('remove', function (id) {
                if (game.scene.getScene('ScenePreload').enemies[data.id]) {
                    game.scene.getScene('ScenePreload').enemies[id].removePlayer();
                }
            });

            cliente.socket.on('giveMainCamera', function () {
                game.scene.getScene('ScenePreload').player.giveCamera();
            });
        });
    }

    movePlayer(x, y, forceX, forceY) {
        this.socket.emit('movePlayer', {
            x: x,
            y: y,
            forceX: forceX,
            forceY: forceY
        });
    }
}

const cliente = new Cliente();