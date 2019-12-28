// /**
//  * @type {import("../def/phaser")}
//  */

/** 
 * Variable que guarda todos los ajustes del las escenas de Phaser
 * @type {JSON}
 * @name config 
 * @property {Phaser} type - Tipo de renderizado para el navegador
 * @property {number} width - Anchura máxima de las esenas
 * @property {number} height - Altura máxima de las escenas
 * @property {Phaser.Display.Color} backgroundColor - Color de fondo
 * @property {JSON} physics - Fisicas para controlar el juego
 * @property {string} physics.default - Tipo de fisicas
 * @property {JSON} physics.arcade - Ajustes de {@link config}.physics.default
 * @property {bool} physics.arcade.debug - Con el debug activado se muestran los coliders i fuerzas
 * @property {JSON} physics.arcade.gravity - Gravedad del juego para los objetos con fisicas
 * @property {number} physics.arcade.gravity.y - Direccion de la gravedad Y
 * @property {JSON} render - Opciones con el renderizado del juego
 * @property {bool} render.pixelArt - Con pixelArt consigues que entre pixeles no haya espacios en blanco y se muevan mas suave
 * @property {bool} render.pixelArt - No se puede reescalar las escenas de phaser
 * @property {Phaser.Scene[]} scene - Declaramos todas las escenas que utlizamos
 * @property {Phaser.Scene} scene.ScenePreload - {@link ScenePreload} Escena para cargar todos los assets
 * @property {Phaser.Scene} scene.SceneStart - {@link SceneStart} Escena para empezar el juego
 * @property {Phaser.Scene} scene.SceneChooseWeapon - {@link SceneChooseWeapon} Escena para cambiar el arma del jugador
 */
const config = {
    type: Phaser.AUTO,
    width: 820,
    height: 400,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            // gravity: { y: 1000 }
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true,
        autoResize: false
    },
    scene: [
        ScenePreload,
        SceneStart,
        SceneChooseWeapon,
    ],
};

/**
 * Variable del juego para podere acceder desde el cliente a todas las escenas
 * @type {Phaser.Game}
 * @name game 
 */
var game = new Phaser.Game(config);
var gameState;

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

var canvas;

window.onload = function () {
    canvas = document.getElementsByTagName('canvas')[0];

}

/**
 * Esconde el cursor en el juego
 * @function hideCursor 
 */
function hideCursor() {
    if (canvas.style.cursor != 'none') {
        canvas.style.cursor = 'none';
    }
}

/**
 * Muestra el cursor en el juego
 * @function showCursor 
 */
function showCursor() {
    if (canvas.style.cursor != 'auto') {
        canvas.style.cursor = 'auto';
    }
}