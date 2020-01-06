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
                game.scene.getScene(sceneNames.GAME).addNewEnemy(data.id, data.x, data.y, {
                    butt: data.butt,
                    handle: data.handle,
                    canon: data.canon,
                });
            }
        })
    }

    /**
     * Recibe los cambios de los enemigos
     */
    allEnemiesInfo() {
        /**
         * Al cargar todos los enemigos creo los enemigos y las llamadas a los cambios enemigos
         * @property {socket.player[]} data
         * @event getAllEnemies 
         */
        this.socket.on('getAllEnemies', function (data) {
            for (var i = 0; i < data.length; i++) {
                game.scene.getScene(sceneNames.GAME).addNewEnemy(data[i].id, data[i].x, data[i].y, {
                    butt: data[i].butt,
                    handle: data[i].handle,
                    canon: data[i].canon,
                });
            }

            /**
             * Muevo el enemigos en el cliente
             * @property {JSON} data Datos del jugador
             * @property {Number} data.id Id del jugador
             * @property {Number} data.x Posicion horizontal del jugador
             * @property {Number} data.y Posicion vertical del jugador
             * @property {Number} data.weaponRotation Rotación del arma
             * @event moveEnemyWithForce 
             */
            cliente.socket.on('movePlayerToPositionAndRotation', function (data) {
                if (game.scene.getScene(sceneNames.GAME).enemies[data.id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[data.id].movePlayerToPositionAndRotation(data.x, data.y, data.weaponRotation);
                }
            });

            /**
             * Creo la bala en el cliente
             * @property {JSON} data Datos de la bala
             * @property {Number} data.id Id del jugador
             * @property {Number} data.x Posicion horizontal de la bala
             * @property {Number} data.y Posicion vertical de la bala
             * @property {String} data.bulletType Tipo de bala que se dispara
             * @property {Number} data.rotation Rotación de la bala
             * @event createBullet
             */
            cliente.socket.on('createBullet', function (data) {
                if (game.scene.getScene(sceneNames.GAME).enemies[data.id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[data.id].weapon.createBullet(data);
                }
            });

            /**
             * Cambio la animacion del enemigo
             * @property {JSON} data Datos de la bala
             * @property {Number} data.id Id del jugador
             * @property {String} data.animation Animación del jugador
             * @property {Boolean} data.side Direccion del jugador
             * @event changePlayerAnimation
             */
            cliente.socket.on('changePlayerAnimation', function (data) {
                if (game.scene.getScene(sceneNames.GAME).enemies[data.id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[data.id].character.playCustomAnimation(data.animation, data.side);
                }
            });

            /**
             * Al desconectarse el jugador lo elimino del cliente...
             * @property {Number} id Id del jugador
             * @event removeEnemy 
             */
            cliente.socket.on('removeEnemy', function (id) {
                if (game.scene.getScene(sceneNames.GAME).enemies[id]) {
                    game.scene.getScene(sceneNames.GAME).enemies[id].removePlayer();
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
    movePlayer(x, y, weaponRotation) {
        this.socket.emit('movePlayer', {
            x: x,
            y: y,
            weaponRotation: weaponRotation,
        });
    }

    /**
     * Envia al servidor el disparo de una bala
     * @param {Number} x Posición horizontal del jugador
     * @param {Number} y Posición vertical del jugador
     * @param {String} bulletType Imagen para cargar el color de la bala
     * @param {Number} rotation Rotación de la bala
     */
    shootBullet(x, y, bulletType, rotation) {
        this.socket.emit('shootBullet', {
            x: x,
            y: y,
            bulletType: bulletType,
            rotation: rotation,
        });
    }

    /**
     * Avisa al servidor del cambio de animacion
     * @property {JSON} data Datos de la bala
     * @property {String} data.animation Animación del jugador
     * @property {Boolean} data.side Direccion del jugador
     */
    changeAnimation(data) {
        this.socket.emit('changeAnimation', data);
    }
}

/**
 * Variable que define el cliente del juego
 * @name cliente 
 */
const cliente = new Cliente();