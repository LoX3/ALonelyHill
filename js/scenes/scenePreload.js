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
        var i

        //Load butt parts
        i = 0;
        for (let bt in weaponParts.BUTT) {
            var id = weaponParts.BUTT[bt];
            this.load.image(id, '../../assets/weapons/BUTT/' + id + '.png');
            i++;
            // console.log(" LOADED:" + id + " | with route : " + '../../assets/weapons/BUTT/' + id + '.png');
        }

        //Load handle parts
        i = 0;
        for (let bd in weaponParts.HANDLE) {
            var id = weaponParts.HANDLE[bd];
            this.load.image(id, '../../assets/weapons/HANDLE/' + id + '.png');
            i++;
            // console.log(" LOADED: handle_" + bd + " | with route : " + '../../assets/weapons/HANDLE/' + id + '.png');
        }

        //Load canon parts
        i = 0;
        for (let c in weaponParts.CANON) {
            var id = weaponParts.CANON[c];
            this.load.image(id, '../../assets/weapons/CANON/' + id + '.png');
            i++;
            // console.log(" LOADED: canon_" + c + " | with route : " + '../../assets/weapons/CANON/' + id + '.png');
        }
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

        this.preloadWeaponParts();

        this.load.image('bullet', '../../assets/player/weapon/bullet/1.png');
        this.load.image('sensei', '../../assets/player/sensei.png');
        this.load.image('scope', '../../assets/player/weapon/scope50.png');
        this.load.image('next_arrow', '../../assets/custom/arrow.png');

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
        gameState = gameStates.MENU;

        this.scene.launch(sceneNames.START, {
            butt: weaponParts.BUTT.TEN,
            handle: weaponParts.HANDLE.EIGHT,
            canon: weaponParts.CANON.SIX,
        });
    }
}