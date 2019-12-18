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
    constructor(scene, x, y, characterImage) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);

        // Creo las variables de la clase
        this.init();

        // Le doy fisicas al container para que entre tenga colliders i se mueva
        scene.physics.world.enableBody(this);

        // Creo el jugador
        this.crearCharacter(scene, characterImage);

        // Creo el arma
        this.crearWeapon(scene);

        // Activo las variables internas
        this.customData();

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
         * @type {Character} character 
         */
        this.character;

        /**
         * @type {Weapon} weapon 
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

    /**
     * Creo la imagen del jugador
     * @param {Phaser.Scene} scene Escena donde se crean las imagenes
     * @param {String} characterImage String con el id del asset para cargar
     */
    crearCharacter(scene, characterImage) {
        this.character = new Character(scene, this.body.width / 2, this.body.height / 2, characterImage);

        // Añado el jugador como hijo para que copie el movimiento del padre
        this.addAt(this.character, 0);
    }

    /** 
     * Creo el arma para el jugador
     * @param {Phaser.Scene} scene Escena donde se crean las imágenes
     */
    crearWeapon(scene) {
        // Culata del arma
        var butt = scene.add
            .image(0, 0, 'butt_ONE')
            .setOrigin(1, 0.5)
            .setScale(0.7);

        // Cuerpo del arma
        var handle = scene.add
            .image(0, 0, 'handle_ONE')
            .setOrigin(0.5)
            .setScale(0.7);

        // Cañón del arma
        var canon = scene.add
            .image(0, 0, 'canon_ONE')
            .setOrigin(0, 0.5)
            .setScale(0.7);

        // Creo el arma y la guardo en una variable publica para poder declararla luego
        this.weapon = new Weapon(
            scene,
            this.body.width / 2,
            this.body.height / 2 + this.character.height / 2,
            butt,
            handle,
            canon,
            'bullet'
        );

        // Añado el arma como hijo para que copie el movimiento del padre
        this.addAt(this.weapon, 1);
    }

    /**
     * Activo los datos en el objeto y le doy propiedades
     */
    customData() {
        this.setDataEnabled(true);

        this.setData({
            id: 'IdJugador',
            nombre: 'NombreJugador',
            vida: 100,
            velocidad: 100,
        });
    }
}