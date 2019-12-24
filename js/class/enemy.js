/**
 * @class Enemigo del jugador
 */
class Enemy extends Phaser.GameObjects.Container {
    /**
     * @constructor Constructor de la escena Enemy
     */
    constructor(scene, x, y, characterImage) {
        super(scene, x, y);

        scene.physics.world.enableBody(this);

        // Creo el jugador
        this.crearCharacter(scene, characterImage);


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

    }

    /**
     * @function preload Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {

    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {

    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {

    }

    crearCharacter(scene, characterImage) {
        this.character = new Character(scene, this.body.width / 2, this.body.height / 2, characterImage);

        // Añado el jugador como hijo para que copie el movimiento del padre
        this.addAt(this.character, 0);
    }

    removePlayer() {
        this.destroy();
    }

    movePlayerWithForce(forceX, forceY) {
        this.body.setVelocityX(forceX);
        this.body.setVelocityY(forceY);
    }
}