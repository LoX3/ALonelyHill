// import {} from '../../assets/weapons/Part1/'
/**
 * @class Se cargan los assets del juego
 */
class ScenePreload extends Phaser.Scene {
    /**
     * @constructor Constructor de la escena
     */
    constructor() {
        super({
            key: 'ScenePreload',
        })
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
     * @function preloadWeaponParts Función encargada de cargar todas 
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
<<<<<<< HEAD
            this.load.image(id, '../../assets/weapons/BUTT/' + id + '.png');
=======
            this.load.image('a' + bt, '../../assets/weapons/BUTT/' + id + '.png');
>>>>>>> 3e2a89069c875b33dc6047fb5683d25ddb4e62da
            i++;
            console.log(" LOADED:" + id + " | with route : " + '../../assets/weapons/BUTT/' + id + '.png');
        }

        //Load handle parts
        i = 0;
        for (let bd in weaponParts.HANDLE) {
            var id = weaponParts.HANDLE[bd];
<<<<<<< HEAD
            this.load.image(id, '../../assets/weapons/HANDLE/' + id + '.png');
=======
            this.load.image('b' + bd, '../../assets/weapons/HANDLE/' + id + '.png');
>>>>>>> 3e2a89069c875b33dc6047fb5683d25ddb4e62da
            i++;
            // console.log(" LOADED: handle_" + bd + " | with route : " + '../../assets/weapons/HANDLE/' + id + '.png');
        }

        //Load canon parts
        i = 0;
        for (let c in weaponParts.CANON) {
            var id = weaponParts.CANON[c];
<<<<<<< HEAD
            this.load.image(id, '../../assets/weapons/CANON/' + id + '.png');
=======
            this.load.image('c' + c, '../../assets/weapons/CANON/' + id + '.png');
>>>>>>> 3e2a89069c875b33dc6047fb5683d25ddb4e62da
            i++;
            // console.log(" LOADED: canon_" + c + " | with route : " + '../../assets/weapons/CANON/' + id + '.png');
        }

        this.load.image('bullet', '../../assets/player/weapon/bullet/1.png');
        this.load.image('sensei', '../../assets/player/sensei.png');
        this.load.image('scope', '../../assets/player/weapon/scope50.png');

        this.load.on('progress', function (value) {
            // console.log(value);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        this.load.on('complete', function () {
            // console.log('complete');
        });
    }

    /**
     * @function preload Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {
        this.preloadWeaponParts();
    }

    /**
     * @function rotateWeaponTowardsMouseAngle 
     * Esta función se usa para rotar el arma en función de la posición del
     * cursor en la pantalla.
     */
    rotateWeaponTowardsMouseAngle(pointer) {
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(this.weapon.x, this.weapon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
        this.weapon.setScale(1, (cursor.x < config.width / 2) ? -1 : 1);
        this.weapon.setRotation(angle);
    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        this.player = new Player(this, 100, 100, 'sensei');

        var color = Phaser.Display.Color.GetColor32(255, 0, 0, 110);
        this.cameras.main.setBackgroundColor(color);

        this.text = this.add.text(0, 0, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.player.update();

        this.text.setText([
            'x: ' + this.cameras.main.x,
            'y: ' + this.cameras.main.y,
            'scrollX: ' + this.cameras.main.scrollX,
            'scrollY: ' + this.cameras.main.scrollY,
        ]);
    }
}