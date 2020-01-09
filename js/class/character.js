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

        // Pongo una animacion por defecto
        this.playIdleDown();

        // Añado el player para que haga las animaciones
        scene.add.existing(this);
    }

    /**
     * Doy una animacion y una direccion al jugador
     * @param {String} animation Animacion del jugador
     * @param {Boolean} side Direccion del jugador
     */
    playCustomAnimation(animation, side) {
        this.play(animation, true);

        switch (animation) {
            case 'run_side':
            case 'idle_side':
                if (side) {
                    this.setScale(Math.abs(this.scaleX), this.scaleY);
                }
                else {
                    this.setScale(-Math.abs(this.scaleX), this.scaleY);
                }
                break;
            case 'run_back':
            case 'idle_back':
                this.parentContainer.sendToBack(this.parentContainer.weapon);
                break;

            default:
                this.parentContainer.sendToBack(this);
                break;
        }
    }

    /**
     * Animacion de correr hacia la izquierda
     */
    playRunLeft() {
        this.play('run_side', true);
        this.setScale(-Math.abs(this.scaleX), this.scaleY);
    }

    /**
     * Animacion de correr hacia la derecha
     */
    playRunRight() {
        this.play('run_side', true);
        this.setScale(Math.abs(this.scaleX), this.scaleY);
    }

    /**
     * Animacion de correr hacia la arriba
     */
    playRunUp() {
        this.play('run_back', true);
    }

    /**
     * Animacion de correr hacia la abajo
     */
    playRunDown() {
        this.play('run_front', true);
    }

    /**
     * Animacion Idle hacia la izquierda
     */
    playIdleLeft() {
        this.play('idle_side', true);
        this.setScale(-Math.abs(this.scaleX), this.scaleY);
    }

    /**
     * Animacion Idle hacia la derecha
     */
    playIdleRight() {
        this.play('idle_side', true);
        this.setScale(Math.abs(this.scaleX), this.scaleY);
    }

    /**
     * Animacion Idle hacia la arriba
     */
    playIdleUp() {
        this.play('idle_back', true);
    }

    /**
     * Animacion Idle hacia la abajo
     */
    playIdleDown() {
        this.play('idle_front', true);
    }
}