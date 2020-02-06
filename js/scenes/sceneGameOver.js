/**
 * Escena que se ejecuta al perder el jugador
 * @class 
 */
class SceneGameOver extends Phaser.Scene {
    /**
     * Constructor de la escena SceneGameOver
     * @constructor 
     */
    constructor() {
        super(
            {
                key: sceneNames.GAMEOVER,
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
        this.input.setDefaultCursor('pointer');
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        // Cambio el color del fondo
        var color = Phaser.Display.Color.GetColor32(0, 0, 0, 127.5);
        this.cameras.main.setBackgroundColor(color);

        this.restartButton();
    }

    /**
     * Crea el boton para hacer restart
     */
    restartButton() {
        var txtRestart = this.add.text(config.width / 2, (config.height / 5) * 4.5, 'RESTART!', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (36),
            color: colors.hex.white,
        })
            .setInteractive()
            .setOrigin(0.5, 1);

        txtRestart.on('pointerdown', function () {
            this.scene.restartGame();
        });
    }

    /**
     * Reseteo el juego
     */
    restartGame() {
        location.reload();
        // Arranco la escena principal
        // this.scene.launch(sceneNames.MENU);

        // Paro las escenas del juego
        // this.scene.get(sceneNames.GAME).stop();
        // this.scene.get(sceneNames.GAMEUI).stop();

        // Paro esta escena
        // this.scene.stop();
    }
}