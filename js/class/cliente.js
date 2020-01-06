/**
 * @class Parte cliente del videojuego, tiene la función de comunicarse con el servidor
 */
class Cliente {
    /**
     * Constructor de la clase Cliente
     * @constructor
     */
    constructor() {
        this.init();

        // Inicializo la variable
        this.socket = io.connect();

        this.serverInfo();
        this.enemyInfo();
        this.allEnemiesInfo();
    }

    /**
     * Init es la primera función que se llama cuando se
     * inicia su estado. Se llama antes de precargar, crear o cualquier
     * otra cosa. Si necesita enrutar el juego a otro estado, puede
     * hacerlo aquí, o si necesita preparar un conjunto de variables u
     * objetos antes de que comience la precarga.
     */
    init() {
        /**
         * Guarda una coneción con el servidor
         * @type {Object}
         */
        this.socket;
    }

    /**
     * Pide una prueba de funcionamiento al servidor
     */
    sendTest() {
        this.socket.emit('test');
    }

    /**
     * Pide una prueba de funcionamiento al servidor
     */
    serverInfo() {
        this.socket.on('testOk', function (data) {
            console.log(data);
        });
    }

    /**
     * Registra al jugador en el servidor
     */
    registerPlayer(player) {
        this.socket.emit('newServerPlayer', player);
    }

    /**
     * Registra al enemigo en el cliente
     */
    enemyInfo() {
        this.socket.on('newEnemy', function (data) {
            if (gameState == gameStates.LOADING || gameState == gameStates.PLAYING) {
                game.scene.getScene(sceneNames.GAME).addNewEnemy(data.id, data.x, data.y);
            }
        })
    }

    /**
     * Recibe los cambios de los enemigos
     */
    allEnemiesInfo() {
        /**
         * Al cargar todos los enemigos creo los enemigos y las llamadas a los cambios enemigos
         * @event getAllEnemies 
         */
        this.socket.on('getAllEnemies', function (data) {
            for (var i = 0; i < data.length; i++) {
                game.scene.getScene(sceneNames.GAME).addNewEnemy(data[i].id, data[i].x, data[i].y);
            }

            /**
             * Muevo el enemigos en el cliente
             * @event moveEnemyWithForce 
             */
            cliente.socket.on('movePlayerToPositionAndRotation', function (data) {
                if (game.scene.getScene(sceneNames.GAME).enemies[data.id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[data.id].movePlayerToPositionAndRotation(data.x, data.y, data.weaponRotation);
                }
            });

            /**
             * Al desconectarse el jugador lo elimino del cliente...
             * @event removeEnemy 
             */
            cliente.socket.on('removeEnemy', function (id) {
                if (game.scene.getScene(sceneNames.GAME).enemies[id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[id].removePlayer();
                }
            });

            cliente.socket.on('createBullet', function (data) {
                if (game.scene.getScene(sceneNames.GAME).enemies[data.id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[data.id].weapon.createBullet(data);
                }
            })
        });
    }

    /**
     * Avisa al servidor del movimiento del jugador
     * @param {Number} x Posición horizontal del jugador
     * @param {Number} y Posición vertical del jugador
     * @param {Number} forceX Fuerza del movimiento horizontal del jugador
     * @param {Number} forceY Fuerza del movimiento vertical del jugador
     */
    movePlayer(x, y, weaponRotation) {
        this.socket.emit('movePlayer', {
            x: x,
            y: y,
            weaponRotation: weaponRotation,
        });
    }

    shootBullet(x, y, bulletType, rotation) {
        this.socket.emit('shootBullet', {
            x: x,
            y: y,
            bulletType: bulletType,
            rotation: rotation,
        });
    }
}

/**
 * Variable que define el cliente del juego
 * @name cliente 
 */
const cliente = new Cliente();