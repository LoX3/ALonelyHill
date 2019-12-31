/**
 * Escena para tener la interfaz del usuario
 * @class 
 */
class SceneGameUI extends Phaser.Scene {
    /**
     * Constructor de la escena SceneGameUI
     * @constructor 
     */
    constructor() {
        super(
            {
                key: sceneNames.GAMEUI,
            }
        );
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
         * Texto con la municion del jugador
         */
        this.gunReloaderText;
    }

    /**
     * Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {

    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        this.textoMunicion();
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {

    }

    /**
     * Creo el texto de la munición
     */
    textoMunicion() {
        this.gunReloaderText = this.add.text(5, 0, 'HOLA!', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (32),
            color: "#000"
        });

        this.gunReloaderText.setY(config.height - this.gunReloaderText.height);
    }
}