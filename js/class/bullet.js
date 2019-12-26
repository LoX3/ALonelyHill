/**
 * @class Bullet - Bala para disparar
 *
 * @param {Phaser.Scene} scene Escena donde se pone la bala
 * @param {Number} x Posicion horizontal del sprite
 * @param {Number} y Posicion vertical del sprite
 * @param {String} bulletType Tipo de bala que se dispara
 * @param {Number} bulletRotation Rotación de  la bala
 */
class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * @constructor Constructor de la bala
     * @param {Phaser.Scene} scene
     * @param {Number} x
     * @param {Number} y
     * @param {String} bulletType
     * @param {Number} bulletRotation
     */
    constructor(scene, x, y, bulletType, bulletRotation) {
        // Se crea el sprite con la escena, la posición i la imagen
        super(scene, x, y, bulletType);
        this.scene = scene;

        // Muevo un poco la bala para que salga mejor del cañón

        // this.x += this.width / 2;
        // this.y += this.height / 2;

        // Añado fisicas para que pueda chocar contra otros elementos
        scene.physics.world.enableBody(this);

        // Roto la bala, como esta la pistola para que salga bien
        this.setRotation(bulletRotation);

        // Le doy velocidad hacia donde esta rotada, eso hace que siga hacia donde mira
        // scene.physics.velocityFromRotation(this.rotation, 1, this.body.velocity);
        scene.physics.velocityFromRotation(this.rotation, 800, this.body.velocity);

        // Añado la bala en al escena
        scene.add.existing(this);
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        // Si se sale de la pantalla, se destruye el objeto
        if (
            this.x > this.scene.cameras.main.scrollX + config.width + this.width ||
            this.x < this.scene.cameras.main.scrollX - this.width ||
            this.y > this.scene.cameras.main.scrollY + config.height + this.height ||
            this.y < this.scene.cameras.main.scrollY - this.height
        ) {
            this.destroy();
        }
    }
}