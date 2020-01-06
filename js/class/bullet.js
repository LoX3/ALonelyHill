/**
 * @class Bullet - Bala para disparar
 *
 * @param {Phaser.Scene} scene 
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} bulletType 
 * @param {Number} bulletRotation 
 */
class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la bala
     * @constructor
     * @param {Phaser.Scene} scene Escena donde se pone la bala
     * @param {Number} x Posicion horizontal del sprite
     * @param {Number} y Posicion vertical del sprite
     * @param {String} bulletType Tipo de bala que se dispara
     * @param {Number} bulletRotation Rotación de  la bala
     */
    constructor(scene, x, y, bulletType, bulletRotation) {
        // Se crea el sprite con la escena, la posición i la imagen
        super(scene, x, y, bulletType);
        this.init();

        // Guardo la escena
        this.scene = scene;

        // Añado fisicas para que pueda chocar contra otros elementos
        scene.physics.world.enableBody(this);

        // Roto la bala, como esta la pistola para que salga bien
        this.setRotation(bulletRotation);

        // Le doy velocidad hacia donde esta rotada, eso hace que siga hacia donde mira
        // scene.physics.velocityFromRotation(this.rotation, 1, this.body.velocity);
        scene.physics.velocityFromRotation(this.rotation, 800, this.body.velocity);

        // Añado la bala en al escena
        scene.add.existing(this);

        this.create();
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
         * Escena donde se ejecuta el juego
         * @type {Phaser.Scene}
         */
        this.scene;
    }

    create() {
        // Se ha de cambiar
        this.scene.time.delayedCall(10000, () => this.destroy());
    }

    /**
     * Update se llama una vez finalizado la carga de los archivos para poder jugar
     */
    update() {
        // Si se sale de la pantalla, se destruye el objeto
        // if (
        //     this.x > this.scene.cameras.main.scrollX + config.width + this.width ||
        //     this.x < this.scene.cameras.main.scrollX - this.width ||
        //     this.y > this.scene.cameras.main.scrollY + config.height + this.height ||
        //     this.y < this.scene.cameras.main.scrollY - this.height
        // ) {
        //     this.destroy();
        // }
    }
}