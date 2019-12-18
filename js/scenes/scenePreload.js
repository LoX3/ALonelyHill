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
     * @function preload Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {
        this.load.image('butt', '../../assets/weapons_merge/Part1/2.png');
        this.load.image('body', '../../assets/weapons_merge/Part2/2.png');
        this.load.image('canon', '../../assets/weapons_merge/Part3/2.png');
        this.load.image('bullet', '../../assets/player/weapon/bullet/1.png');
        this.load.image('player', './../assets/player/sensei.png')
    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        var butt = this.add
            .image(0, 0, 'butt')
            .setOrigin(1, 0.5);
        var body = this.add
            .image(0, 0, 'body')
            .setOrigin(0.5);
        var canon = this.add
            .image(0, 0, 'canon')
            .setOrigin(0, 0.5);

        this.add.image(100, 100, 'bullet');

        this.player = new Player(this, 100, 100, butt, body, canon, 'bullet');
        this.physics.world.enableBody(this.player);

        this.input.on('pointermove', this.player.weapon.rotateWeaponTowardsMouseAngle, this.player.weapon);
        this.input.on('pointerdown', this.player.weapon.shoot, this.player.weapon);

        var color = Phaser.Display.Color.GetColor32(255, 0, 0, 110);
        this.cameras.main.setBackgroundColor(color);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.player.update();

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }
        else {
            this.player.body.setVelocityX(0);
        }
    }
}