/**
 * @class Enemigo del jugador
 * @param {Phaser.Scene} scene Escena donde se coloca al enemigo
 * @param {Number} x Posicion horizontal del enemigo
 * @param {Number} y Posicion vertical del enemigo
 * @param {String} characterImage Imagen del enemigo
 */
class Enemy extends Phaser.GameObjects.Container {
    /**
     * Constructor de la escena Enemy donde se guardan los datos de un enemigo
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se coloca al enemigo
     * @param {Number} x Posicion horizontal del enemigo
     * @param {Number} y Posicion vertical del enemigo
     * @param {String} characterImage Imagen del enemigo
     */
    constructor(scene, x, y, characterImage) {
        super(scene, x, y);

        scene.physics.world.enableBody(this);

        // Creo el jugador
        this.crearCharacter(scene, characterImage);

        scene.add.existing(this);
    }

    /**
     * Creo la imagen del enemigo
     * @param {Phaser.Scene} scene Escena del juego donde se crea al enemigo
     * @param {String} characterImage Key de la imagen del jugador
     */
    crearCharacter(scene, characterImage) {
        this.character = new Character(scene, this.body.width / 2, this.body.height / 2, characterImage);

        // Añado el jugador como hijo para que copie el movimiento del padre
        this.addAt(this.character, 0);
    }

    /**
     * Borra al jugador
     */
    removePlayer() {
        this.destroy();
    }

    /**
     * Muevo al jugador enemigo a sus cordenadas
     * @param {Number} enemyX Posición horizontal
     * @param {Number} enemyY Posición vertical
     */
    movePlayerToPosition(enemyX, enemyY) {
        this.x = enemyX;
        this.y = enemyY;
    }
}