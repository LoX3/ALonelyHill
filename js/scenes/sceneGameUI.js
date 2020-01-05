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
         * @type {Phaser.GameObjects.Text}
         */
        this.gunReloaderText;

        /**
         * Texto con la vida del jugador
         * @type {Phaser.GameObjects.Text}
         */
        this.livePlayerText;

        /**
         * Alerta para recargar
         * @type {Phaser.GameObjects.Text}
         */
        this.reloadAlertText;

        /**
         * Icono de la bala
         * @type {Phaser.GameObjects.Image}
         */
        this.bulletIcon

        /**
         * Icono de la vida
         * @type {Phaser.GameObjects.Image}
         */
        this.healthIcon;
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
        // Creo la UI de detras de el texto
        this.createGuiBackground();

        // Creo el texto que usaremos
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
        this.bulletIcon = this.add
            .image(0, 0, 'bulletIcon')
            .setScale(0.7);
        this.bulletIcon.setX(((this.bulletIcon.width * this.bulletIcon.scaleX) / 2) + 5);
        this.bulletIcon.setY(config.height - (this.bulletIcon.height * this.bulletIcon.scaleY) + 4);

        // Balas del jugador
        this.gunReloaderText = this.add
            .text(10 + (this.bulletIcon.width * this.bulletIcon.scaleX), 0, '', {
                align: "center",
                fontFamily: '"iPixelU"',
                fontSize: (32),
                color: colors.hex.white
            });
        // Muevo la Y para que quede bien alineado a la izquierda
        this.gunReloaderText.setY(config.height - this.gunReloaderText.height);

        // Alerta para recargar las balas
        this.reloadAlertText = this.add
            .text(config.width / 2, config.height / 4, '', {
                align: "center",
                fontFamily: '"iPixelU"',
                fontSize: (32),
                color: colors.hex.yellow
            })
            .setOrigin(0.5);

        this.healthIcon = this.add
            .image(config.width - 5, 0, 'healthIcon')
            .setScale(0.8)
            .setOrigin(1, 0);
        this.healthIcon.setY(config.height - (this.healthIcon.height * this.healthIcon.scaleY) - 5);

        // Creo la vida del jugador
        this.livePlayerText = this.add
            .text(config.width - (this.healthIcon.width * this.healthIcon.scaleX) - 5, 0, '', {
                align: "center",
                fontFamily: '"iPixelU"',
                fontSize: (32),
                color: colors.hex.white
            })
            .setOrigin(1, 0);
        // Muevo la Y para que quede bien alineado a la derecha
        this.livePlayerText.setY(config.height - this.livePlayerText.height);
    }

    /**
     * Advertencia para el jugador que ha de recargar
     */
    enableReloadAlert() {
        this.gunReloaderText.setColor(colors.hex.yellow);
        this.reloadAlertText.setColor(colors.hex.yellow);
        this.reloadAlertText.setText("reload! (PRESS 'r')");
    }

    /**
     * Informacion para el jugador que esta recargando
     */
    setReloadState() {
        this.gunReloaderText.setColor(colors.hex.green);
        this.reloadAlertText.setColor(colors.hex.green);
        this.reloadAlertText.setText("reloading...");
    }

    /**
     * Quito las advertencias e informaciones de la recarga
     */
    disableReloadAlert() {
        this.gunReloaderText.setColor(colors.hex.white);
        this.reloadAlertText.setText("");
    }

    /**
     * Creo los fondos para la municion y la vida del jugador
     */
    createGuiBackground() {
        this.createMunitionGuiBackground();
        this.createVidaGuiBackground();
    }

    /**
     * Creo el fondo para la municion
     */
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

    /**
     * Creo el fondo para la vida
     */
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