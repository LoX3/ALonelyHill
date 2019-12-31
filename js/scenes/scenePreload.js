/**
 * @class Se cargan los assets del juego
 */
class ScenePreload extends Phaser.Scene {
    /**
     * Constructor de la escena
     * @constructor 
     */
    constructor() {
        super({
            key: sceneNames.PRELOAD,
        })
    }

    /**
     * Función encargada de cargar todas 
     * las partes de weapon con sus respectivos id's a partir del enum
     * que sirve para referirse a cada una de ellas de manera inequívoca (weaponParts).
     */
    preloadWeaponParts() {
        //Variables
        var i;

        //Load butt parts
        i = 0;
        for (let bt in weaponParts.BUTT) {
            var id = weaponParts.BUTT[bt];
            this.load.image(id, 'weapons/BUTT/' + id + '.png');
            i++;
            // console.log(" LOADED: " + bt + " | with route : " + '../../assets/weapons/BUTT/' + id + '.png');
        }

        //Load handle parts
        i = 0;
        for (let bd in weaponParts.HANDLE) {
            var id = weaponParts.HANDLE[bd];
            this.load.image(id, 'weapons/HANDLE/' + id + '.png');
            i++;
            // console.log(" LOADED: handle_" + bd + " | with route : " + '../../assets/weapons/HANDLE/' + id + '.png');
        }

        //Load canon parts
        i = 0;
        for (let c in weaponParts.CANON) {
            var id = weaponParts.CANON[c];
            this.load.image(id, 'weapons/CANON/' + id + '.png');
            i++;
            // console.log(" LOADED: canon_" + c + " | with route : " + '../../assets/weapons/CANON/' + id + '.png');
        }
    }


    preloadCharacterAnimations() {
        //Idle
        this.load.image('idle_0', 'player/character/idle_0.png');
        this.load.image('idle_1', 'player/character/idle_1.png');
        this.load.image('idle_2', 'player/character/idle_2.png');
        this.load.image('idle_3', 'player/character/idle_3.png');
        //Running
        this.load.image('run_F_0', 'player/character/run_F_0.png');
        this.load.image('run_F_1', 'player/character/run_F_1.png');
        this.load.image('run_F_2', 'player/character/run_F_2.png');
        this.load.image('run_F_3', 'player/character/run_F_3.png');

    }

    /**
     * Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {
        gameState = gameStates.PRELOAD;

        this.load.path = '../../assets/';

        this.preloadWeaponParts();

        this.preloadCharacterAnimations();

        this.load.image('bullet', 'player/weapon/bullet/1.png');
        this.load.image('sensei', 'player/sensei.png');
        this.load.image('scope', 'player/weapon/scope50.png');
        this.load.image('arrow', 'custom/arrow.png');

        // Cargi el mapa
        this.load.image('genericRPG', 'maps/genericRPG.png');

        this.load.on('progress', function (value) {
            // console.log(value);
        });

        this.load.on('fileprogress', function (file) {
            // console.log(file.src);
        });

        this.load.on('complete', function () {
            // console.log('complete');
        });
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        gameState = gameStates.PRELOAD;

        this.scene.launch(sceneNames.SETUP);
    }
}