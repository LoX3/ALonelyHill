/**
 * @class Player - Jugador del juego
 *
 * @param {Phaser.Scene} scene Escena donde se pone el jugador
 * @param {Number} x Posicion horizontal del contenedor
 * @param {Number} y Posicion vertical del contenedor
 */
class Player extends Phaser.GameObjects.Container {
    /**
     * @constructor Constructor del jugador
     * @param {Phaser.Scene} scene
     * @param {Number} x
     * @param {Number} y
     */
    constructor(scene, x, y) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);

        // Creo las variables de la clase
        this.init();

        var butt = scene.physics.add
            .image(0, 0, 'butt_ONE')
            .setOrigin(1, 0.5);
        var handle = scene.physics.add
            .image(0, 0, 'handle_ONE')
            .setOrigin(0.5);
        var canon = scene.physics.add
            .image(0, 0, 'canon_ONE')
            .setOrigin(0, 0.5);

        // Creo el arma y la guardo en una variable publica para poder declararla luego
        this.weapon = new Weapon(scene, 0, 0, butt, handle, canon, 'bullet');

        // Añado el arma como hijo para que copie el movimiento del padre
        this.addAt(this.weapon, 0);

        // Añado el container a la escena
        scene.add.existing(this);
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
         * @var {Weapon} weapon 
         */
        this.weapon;
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        // Hago el update del hijo
        this.weapon.update();
    }
}