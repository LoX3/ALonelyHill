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
        this.clientInfo();
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

    clientInfo() {

    }
}

const cliente = new Cliente();
cliente.sendTest();