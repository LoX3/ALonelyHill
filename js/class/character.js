/**
 * @class Imagen del jugador
 * @param {Phaser.Scene} scene
 * @param {Number} x
 * @param {Number} y
 * @param {String} image
 */
class Character extends Phaser.GameObjects.Image {
    /**
     * Constructor de la imagen del personaje
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se pone la imagen
     * @param {Number} x Posicion horizontal de la imagen
     * @param {Number} y Posicion vertical de la imagen
     * @param {String} image Imagen del personaje
     */
    constructor(scene, x, y, image) {
        super(scene, x, y, image);

        this.setScale(2);
    }
}