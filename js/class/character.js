/**
 * @class Imagen del jugador
 * 
 * @param {Phaser.Scene} scene
 * @param {Number} x
 * @param {Number} y
 */
class Character extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la imagen del personaje
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se pone la imagen
     * @param {Number} x Posicion horizontal de la imagen
     * @param {Number} y Posicion vertical de la imagen
     */
    constructor(scene, x, y) {
        super(scene, x, y, '');

        this.setScale(2);

        this.playIdleDown();

        scene.add.existing(this);
    }

    playRunLeft() {
        this.anims.play('run_side', true);
        this.setScale(-Math.abs(this.scaleX), this.scaleY);
    }

    playRunRight() {
        this.anims.play('run_side', true);
        this.setScale(Math.abs(this.scaleX), this.scaleY);
    }

    playRunUp() {
        this.anims.play('run_back', true);
    }

    playRunDown() {
        this.anims.play('run_front', true);
    }


    playIdleLeft() {
        this.anims.play('idle_side', true);
        this.setScale(-Math.abs(this.scaleX), this.scaleY);
    }

    playIdleRight() {
        this.anims.play('idle_side', true);
        this.setScale(Math.abs(this.scaleX), this.scaleY);
    }

    playIdleUp() {
        this.anims.play('idle_back', true);
    }

    playIdleDown() {
        this.anims.play('idle_front', true);
    }
}