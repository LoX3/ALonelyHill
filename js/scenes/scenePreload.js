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

    /**
     * Cargo las animaciones del jugador
     */
    preloadCharacterAnimations() {
        //Idle
        this.load.image('idle_0', 'player/character/idle/idle_F_0.png');
        this.load.image('idle_1', 'player/character/idle/idle_F_1.png');
        this.load.image('idle_2', 'player/character/idle/idle_F_2.png');
        this.load.image('idle_3', 'player/character/idle/idle_F_3.png');
        //Running
        this.load.image('run_F_0', 'player/character/run/run_F_0.png');
        this.load.image('run_F_1', 'player/character/run/run_F_1.png');
        this.load.image('run_F_2', 'player/character/run/run_F_2.png');
        this.load.image('run_F_3', 'player/character/run/run_F_3.png');

        // Idle back
        this.load.image('idle_back_0', 'player/character/idle/back/idle_B_0.png');
        this.load.image('idle_back_1', 'player/character/idle/back/idle_B_1.png');
        this.load.image('idle_back_2', 'player/character/idle/back/idle_B_2.png');
        this.load.image('idle_back_3', 'player/character/idle/back/idle_B_3.png');

        // Idle side
        this.load.image('idle_side_0', 'player/character/idle/side/idle_S_0.png');
        this.load.image('idle_side_1', 'player/character/idle/side/idle_S_1.png');
        this.load.image('idle_side_2', 'player/character/idle/side/idle_S_2.png');
        this.load.image('idle_side_3', 'player/character/idle/side/idle_S_3.png');

        //#endregion

        //#region Run player preload
        // Run front
        this.load.image('run_front_0', 'player/character/run/front/run_F_0.png');
        this.load.image('run_front_1', 'player/character/run/front/run_F_1.png');
        this.load.image('run_front_2', 'player/character/run/front/run_F_2.png');
        this.load.image('run_front_3', 'player/character/run/front/run_F_3.png');

        // Run back
        this.load.image('run_back_0', 'player/character/run/back/run_B_0.png');
        this.load.image('run_back_1', 'player/character/run/back/run_B_1.png');
        this.load.image('run_back_2', 'player/character/run/back/run_B_2.png');
        this.load.image('run_back_3', 'player/character/run/back/run_B_3.png');

        // Run side
        this.load.image('run_side_0', 'player/character/run/side/run_S_0.png');
        this.load.image('run_side_1', 'player/character/run/side/run_S_1.png');
        this.load.image('run_side_2', 'player/character/run/side/run_S_2.png');
        this.load.image('run_side_3', 'player/character/run/side/run_S_3.png');

        //#endregion
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
        this.load.image('healthIcon', 'player/health.png');
        this.load.image('bulletIcon', 'player/weapon/bullet.png');

        // Cargi el mapa
        this.load.image('genericRPG', 'tilemap/genericRPG.png');

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
        // Creo las animaciones
        this.createAnimations();

        this.scene.launch(sceneNames.MENU);
    }

    /**
     * Creo las animaciones del player
     */
    createAnimations() {
        //#region Idle animation
        // Idle front
        this.anims.create({
            key: 'idle_front',
            frames: [
                {
                    key: 'idle_front_0'
                },
                {
                    key: 'idle_front_1'
                },
                {
                    key: 'idle_front_2'
                },
                {
                    key: 'idle_front_3'
                }
            ],
            frameRate: 2,
            repeat: -1,
        });

        // Idle back
        this.anims.create({
            key: 'idle_back',
            frames: [
                {
                    key: 'idle_back_0'
                },
                {
                    key: 'idle_back_1'
                },
                {
                    key: 'idle_back_2'
                },
                {
                    key: 'idle_back_3'
                }
            ],
            frameRate: 2,
            repeat: -1,
        });

        // Idle side
        this.anims.create({
            key: 'idle_side',
            frames: [
                {
                    key: 'idle_side_0'
                },
                {
                    key: 'idle_side_1'
                },
                {
                    key: 'idle_side_2'
                },
                {
                    key: 'idle_side_3'
                }
            ],
            frameRate: 2,
            repeat: -1,
        });

        //#endregion

        //#region Run animations

        // Run front
        this.anims.create({
            key: 'run_front',
            frames: [
                {
                    key: 'run_front_0'
                },
                {
                    key: 'run_front_1'
                },
                {
                    key: 'run_front_2'
                },
                {
                    key: 'run_front_3'
                }
            ],
            frameRate: 6,
            repeat: -1,
        });

        // Run back
        this.anims.create({
            key: 'run_back',
            frames: [
                {
                    key: 'run_back_0'
                },
                {
                    key: 'run_back_1'
                },
                {
                    key: 'run_back_2'
                },
                {
                    key: 'run_back_3'
                }
            ],
            frameRate: 6,
            repeat: -1,
        });

        // Run side
        this.anims.create({
            key: 'run_side',
            frames: [
                {
                    key: 'run_side_0'
                },
                {
                    key: 'run_side_1'
                },
                {
                    key: 'run_side_2'
                },
                {
                    key: 'run_side_3'
                }
            ],
            frameRate: 6,
            repeat: -1,
        });

        //#endregion
    }
}