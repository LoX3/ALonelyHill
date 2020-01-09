/**
 * @class EnemyWeapon - Arma del Enemigo
 * 
 * @param {Phaser.Scene} scene 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Phaser.GameObjects.Image} butt 
 * @param {Phaser.GameObjects.Image} handle 
 * @param {Phaser.GameObjects.Image} canon 
 * @param {Phaser.GameObjects.Sprite} bulletType 
 */
class EnemyWeapon extends Phaser.GameObjects.Container {
    /**
     * Constructor del arma del jugador
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se pone el arma
     * @param {Number} x Posicion horizontal del contenedor
     * @param {Number} y Posicion vertical del contenedor
     * @param {Phaser.GameObjects.Image} butt Culata del arma
     * @param {Phaser.GameObjects.Image} handle Parte central del arma
     * @param {Phaser.GameObjects.Image} canon Cañon del arma
     * @param {Phaser.GameObjects.Sprite} bulletType Tipo de bala que dispara el arma
     */
    constructor(scene, x, y, butt, handle, canon, bulletType) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);
        // Creo las variables de la clase
        this.init();

        // Guardo la escena en la que estamos
        this.scene = scene;
        // Pongo valor al tipo de bala
        this.bulletType = bulletType;
        // Creo el grupo de balas
        this.bulletGroup = scene.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Al hacer scale de las partes del arma, no quedan bien, con esto se arregla
        var handleWidth = handle.scale * handle.width;
        // Pongo las armas en posición
        butt.x -= (handleWidth / 2);
        canon.x += (handleWidth / 2);

        butt.y += 8;
        handle.y += 8;
        canon.y += 8;

        // Pongo las armas como hijos
        this.addAt(butt, 0);
        this.addAt(handle, 1);
        this.addAt(canon, 2);
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

        /**
         * Tipo de bala que se dispara
         * @type {String} 
         */
        this.bulletType;

        /**
         * Grupo donde se guardan las balas
         * @type {Phaser.GameObjects.Group}
         * @property {JSON} groupConfig Opciones del grupo
         * @property {Bullet} groupConfig.classType Define el tipo de clase en el grupo {@link Phaser.GameObjects.Group#classType}.
         * @property {Boolean} groupConfig.runChildUpdate Hace que se ejecuten los updates de los elementos dentro del grupo {@link Phaser.GameObjects.Group#runChildUpdate}.
         */
        this.bulletGroup;
    }

    /**
     * Aplica rotacion al arma
     * @param {Number} weaponRotation Rotacion del arma
     */
    rotate(weaponRotation) {
        if (Math.abs(weaponRotation) > 1.5) {
            this.setScale(1, -1);
        } else {
            this.setScale(1, 1);
        }

        this.setRotation(weaponRotation);
    }

    createBullet(data) {
        var bala = new Bullet(this.scene, data.x, data.y, 20, data.bulletType, data.rotation);
        bala.body.setSize(7, 7);
        this.bulletGroup.add(bala);
    }
}