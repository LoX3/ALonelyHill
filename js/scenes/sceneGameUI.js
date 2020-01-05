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
        this.createGuiBackground();
        this.createTextLayout();
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
    createTextLayout() {
        this.gunReloaderText = this.add.text(5, 0, '', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (32),
            color: "#FFF"
        });
        this.gunReloaderText.setY(config.height - this.gunReloaderText.height);

        this.reloadAlertText = this.add.text(config.width / 2, config.height / 4, '', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (32),
            color: "#FF0"
        })
            .setOrigin(0.5);

        this.liveText = this.add.text(config.width, 0, '', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (32),
            color: "#FFF"
        })
            .setOrigin(1, 0);
        this.liveText.setY(config.height - this.liveText.height);
    }

    enableReloadAlert() {
        this.gunReloaderText.setColor("#FF0");
        this.reloadAlertText.setColor("#FF0");
        this.reloadAlertText.setText("reload! (PRESS 'r')");
    }

    setReloadState() {
        this.gunReloaderText.setColor("#141");
        this.reloadAlertText.setColor("#141");
        this.reloadAlertText.setText("reloading...");
    }

    disableReloadAlert() {
        this.gunReloaderText.setColor("#FFF");
        this.reloadAlertText.setText("");

    }

    createGuiBackground() {
        this.createMunitionGuiBackground();
        this.createVidaGuiBackground();
    }

    createMunitionGuiBackground() {
        var leftBackground;
        var fondoTransparente;

        // Creo un canvas con un id, width y height
        leftBackground = this.textures.createCanvas('leftBackground', 250, 40);
        // Un gradiente para que no sea de solo un color
        fondoTransparente = leftBackground.context.createLinearGradient(0, 0, 250, 40);

        // Le doy color a diferentes alturas
        fondoTransparente.addColorStop(0, 'rgba(0, 0, 0, 1)');
        fondoTransparente.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        fondoTransparente.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
        fondoTransparente.addColorStop(1, 'rgba(0, 0, 0, 0)');

        leftBackground.context.fillStyle = fondoTransparente;
        leftBackground.context.fillRect(0, 0, config.width, config.height);

        // Esto se usa si utilizas WebGL, si no no veras los cambios
        leftBackground.refresh();

        // Añado el canvas como una imagen
        this.add.image(leftBackground.width / 2, config.height - (leftBackground.height / 2), 'leftBackground');
    }

    createVidaGuiBackground() {
        var rightBackground;
        var fondoTransparente;

        // Creo un canvas con un id, width y height
        rightBackground = this.textures.createCanvas('rightBackground', 150, 40);
        // Un gradiente para que no sea de solo un color
        fondoTransparente = rightBackground.context.createLinearGradient(0, 0, 150, 40);

        // Le doy color a diferentes alturas
        fondoTransparente.addColorStop(0, 'rgba(0, 0, 0, 0)');
        fondoTransparente.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
        fondoTransparente.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        fondoTransparente.addColorStop(1, 'rgba(0, 0, 0, 1)');

        rightBackground.context.fillStyle = fondoTransparente;
        rightBackground.context.fillRect(0, 0, config.width, config.height);

        // Esto se usa si utilizas WebGL, si no no veras los cambios
        rightBackground.refresh();

        // Añado el canvas como una imagen
        this.add.image(config.width - (rightBackground.width / 2), config.height - (rightBackground.height / 2), 'rightBackground');
    }
}