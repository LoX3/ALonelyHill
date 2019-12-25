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
        this.enemyInfo();
        this.allEnemiesInfo();
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

    /**
     * @function sendTest Pide una prueba de funcionamiento al servidor
     */
    sendTest() {
        this.socket.emit('test');
    }

    /**
     * @function serverInfo Pide una prueba de funcionamiento al servidor
     */
    serverInfo() {
        this.socket.on('testOk', function (data) {
            console.log(data);
        });
    }

    /**
     * @function registerPlayer Registra al jugador en el servidor
     */
    registerPlayer() {
        this.socket.emit('newServerPlayer');
    }

    /**
     * @function enemyInfo Registra al enemigo en el cliente
     */
    enemyInfo() {
        this.socket.on('newEnemy', function (data) {
            game.scene.getScene('ScenePreload').addNewEnemy(data.id, data.x, data.y);
        })
    }

    /**
     * @function allEnemiesInfo Recibe los cambios de los enemigos
     */
    allEnemiesInfo() {
        /**
         * @event getAllEnemies Al cargar todos los enemigos creo los enemigos y las llamadas a los cambios enemigos
         */
        this.socket.on('getAllEnemies', function (data) {
            for (var i = 0; i < data.length; i++) {
                game.scene.getScene('ScenePreload').addNewEnemy(data[i].id, data[i].x, data[i].y);
            }

            /**
             * @event moveEnemyWithForce Muevo el enemigos en el cliente
             */
            cliente.socket.on('moveEnemyWithForce', function (data) {
                if (game.scene.getScene('ScenePreload').enemies[data.id]) {
                    game.scene.getScene('ScenePreload').enemies[data.id].movePlayerWithForce(data.forceX, data.forceY);
                }
            });

            /**
             * @event removeEnemy Al desconectarse el jugador lo elimino del cliente...
             */
            cliente.socket.on('removeEnemy', function (id) {
                if (game.scene.getScene('ScenePreload').enemies[data.id]) {
                    game.scene.getScene('ScenePreload').enemies[id].removePlayer();
                }
            });
        });
    }

    /**
     * Avisa al servidor del movimiento del jugador
     * @param {Number} x Posición horizontal del jugador
     * @param {Number} y Posición vertical del jugador
     * @param {Number} forceX Fuerza del movimiento horizontal del jugador
     * @param {Number} forceY Fuerza del movimiento vertical del jugador
     */
    movePlayer(x, y, forceX, forceY) {
        this.socket.emit('movePlayer', {
            x: x,
            y: y,
            forceX: forceX,
            forceY: forceY
        });
    }
}

/**
 * @name cliente Variable que define el cliente del juego
 */
const cliente = new Cliente();