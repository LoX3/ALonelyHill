/**
 * @class Escena para escoer jugador y arma para el usuario
 */
class SceneMenu extends Phaser.Scene {
    /**
     * Constructor de la escena SceneSetUp
     * @constructor 
     */
    constructor() {
        super({
            key: sceneNames.MENU
        });
    }

    /**
     * Init es la primera función que se llama cuando se
     * inicia su estado. Se llama antes de precargar, crear o cualquier
     * otra cosa. Si necesita enrutar el juego a otro estado, puede
     * hacerlo aquí, o si necesita preparar un conjunto de variables u
     * objetos antes de que comience la precarga.
     */
    init() {
        this.txtMenuTitle;
        this.r = 0.01;
        this.arrieved = false;
        this.delta = 0.001;
    }

    /**
     * Crea el mapa para mostrar en la escena de título
     */
    createBackgroundMap() {
        var mapManager = new MapManager();
        mapManager.generate(26, 13);
        var mapMatrix = mapManager.getTitleBackground().getMap();

        this.map = this.make.tilemap({
            data: mapMatrix,
            tileWidth: 32,
            tileHeight: 32,
        });
        // Creamos el tileset de la imagen
        const tileset = this.map.addTilesetImage('genericRPG');

        // Creo una capa, donde se ponen las plataformas
        this.platformsLayer = this.map.createStaticLayer(0, tileset, 0, 0);
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        //Asignamos el estado del juego
        gameState = gameStates.MENU;

        showCursor();

        this.createBackgroundMap();

        this.txtMenuTitle = this.add.text(config.width / 2, 30, 'A Lonely Hill', {
            align: "center",
            fontFamily: '"PixelCowboy"',
            fontSize: (76),
            color: colors.hex.black,
        })
            .setOrigin(0.5, 0);

        this.txtStart = this.add.text(config.width / 2, (config.height / 5) * 4.5, 'START!', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (36),
            color: colors.hex.black,
        })
            .setInteractive()
            .setOrigin(0.5, 1);

        this.txtStart.on('pointerdown', function () {
            this.scene.startGame();
        });

        //Set background color (temporal)
        var color = Phaser.Display.Color.GetColor32(0, 0, 0, 0);
        this.cameras.main.setBackgroundColor(color);

        this.input.keyboard.on('keydown-' + 'SPACE', function () {
            this.scene.startGame();
        });
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.moveTitle();
    }

    /**
     * Mueve la señal del menu
     */
    moveTitle() {
        if (this.r >= 0.1) {
            this.arrieved = true;
        } else if (this.r <= -0.1) {
            this.arrieved = false;
        }

        if (this.r >= 0.01) {
            this.delta -= Phaser.Math.Linear(0.1, 2, 1) / 100000;
        } else if (this.r <= -0.01) {
            this.delta += Phaser.Math.Linear(0.1, 2, 1) / 100000;
        }

        if (this.arrieved) {
            this.r -= Phaser.Math.Linear(0.1, 1, 2) * this.delta;
        } else {
            this.r += Phaser.Math.Linear(0.1, 1, 2) * this.delta;
        }

        this.finalRotation = this.r * 5;

        this.txtMenuTitle.setRotation(this.finalRotation);
    }

    /**
     * Empieza la escena de SetUp
     */
    startGame() {
        this.scene.launch(sceneNames.SETUP);
        this.scene.stop();
    }
}