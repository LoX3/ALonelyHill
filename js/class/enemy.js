/**
 * @class Enemigo del jugador
 * 
 * @param {Phaser.Scene} scene
 * @param {Number} x
 * @param {Number} y
 * @param {String} characterImage
 * @param {JSON} weaponComponents
 * @param {string} weaponComponents.butt
 * @param {string} weaponComponents.handle
 * @param {string} weaponComponents.canon
 */
class Enemy extends Phaser.GameObjects.Container {
    /**
     * Constructor de la escena Enemy donde se guardan los datos de un enemigo
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se coloca al enemigo
     * @param {Number} x Posicion horizontal del enemigo
     * @param {Number} y Posicion vertical del enemigo
     * @param {String} characterImage Imagen del enemigo
     * @param {JSON} weaponComponents Componentes del arma
     * @param {string} weaponComponents.butt Culata del arma
     * @param {string} weaponComponents.handle Cuerpo del arma
     * @param {string} weaponComponents.canon Cañon del arma
     */
    constructor(scene, x, y, characterImage, weaponComponents) {
        super(scene, x, y);

        scene.physics.world.enableBody(this);

        this.name = 'enemy';

        // Creo al enemigo
        this.crearCharacter(scene, characterImage);

        // Creo el arma del enemigo
        this.createWeapon(scene, weaponComponents);

        scene.add.existing(this);
    }

    /**
     * Creo la imagen del enemigo
     * @param {Phaser.Scene} scene Escena del juego donde se crea al enemigo
     * @param {String} characterImage Key de la imagen del jugador
     */
    crearCharacter(scene, characterImage) {
        // Creo la imagen del jugador
        this.character = new Character(scene, this.body.width / 2, this.body.height / 2);

        // Añado el jugador como hijo para que copie el movimiento del padre
        this.addAt(this.character, 0);
    }

    createWeapon(scene, weaponComponents) {
        // Culata del arma
        var butt = scene.add
            .image(0, 0, weaponComponents.butt)
            .setOrigin(1, 0.5)
            .setScale(0.7);

        // Cuerpo del arma
        var handle = scene.add
            .image(0, 0, weaponComponents.handle)
            .setOrigin(0.5)
            .setScale(0.7);

        // Cañón del arma
        var canon = scene.add
            .image(0, 0, weaponComponents.canon)
            .setOrigin(0, 0.5)
            .setScale(0.7);

        // Creo el arma y la guardo en una variable publica para poder declararla luego
        this.weapon = new EnemyWeapon(
            scene,
            this.body.width / 2,
            this.body.height / 2 + 15,
            butt,
            handle,
            canon,
            'bullet'
        );

        // Añado el arma como hijo para que copie el movimiento del padre
        this.addAt(this.weapon, 1);
    }

    /**
     * Borra al enemigo
     */
    removePlayer() {
        this.destroy();
    }

    /**
     * Muevo al enemigo enemigo a sus cordenadas
     * @param {Number} enemyX Posición horizontal
     * @param {Number} enemyY Posición vertical
     */
    movePlayerToPositionAndRotation(enemyX, enemyY, weaponRotation) {
        this.x = enemyX;
        this.y = enemyY;

        this.weapon.rotate(weaponRotation);
    }

    /**
     * Al dar una bala con un enemigo
     * @param {Bullet} bullet Bala que se ha disparado y ha dado a un enemigo
     */
    takeDamage(bullet) {
        bullet.destroy();
    }
}