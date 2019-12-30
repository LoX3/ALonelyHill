/**
 * Escena para escoer el arma del usuario
 * @class 
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
     * @property {JSON} data Variable que recibe los datos al llamar a la escena
     * @property {String} data.butt Culata del arma
     * @property {String} data.handle Cuerpo del arma
     * @property {String} data.canon Cañon del arma
     */
    init() {
        this.txtMenuTitle;
        this.r = 0.01;
        this.arrieved = false;
        this.delta = 0.001;
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

        this.txtMenuTitle = this.add.text(config.width / 2, 30, 'A Lonely Hill', {
            align: "center",
            fontFamily: '"PixelCowboy"',
            fontSize: (76),
            color: "#000"
        })
            .setOrigin(0.5, 0);
        
        this.txtStart = this.add.text(config.width / 2, (config.height/5) * 4.5, 'START!', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (36),
            color: "#000"
        })
            .setInteractive()
            .setOrigin(0.5, 1);

        this.txtStart.on('pointerdown', function () {
            console.log('PLAY!');
            this.scene.scene.start(sceneNames.SETUP);
        });

        //Set background color (temporal)
        var color = Phaser.Display.Color.GetColor32(109, 247, 177, 0);
        this.cameras.main.setBackgroundColor(color);


    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        // console.log(this.r);
        
        if (this.r >= 0.1){
            this.arrieved = true;
        }
        else if (this.r <= -0.1) {
            this.arrieved = false;
        }
        

        if (this.r >= 0.01) {
            this.delta -= Phaser.Math.Linear(0.1,2,1) / 100000;
        }
        else if (this.r <= -0.01) {
            this.delta += Phaser.Math.Linear(0.1,2,1) / 100000;
        }
        else {
            
        }

        if (this.arrieved) {
            this.r -= Phaser.Math.Linear(0.1,1,2) * this.delta;
        }else {
            this.r += Phaser.Math.Linear(0.1,1,2) * this.delta;
        }
        this.finalRotation = this.r * 5;
        this.txtMenuTitle.setRotation(this.finalRotation);
    }

}