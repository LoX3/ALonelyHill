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
    }


    /**
     * @function rotateWeaponTowardsMouseAngle 
     */
    rotateWeaponTowardsMouseAngle(pointer) {
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(this.weapon.x, this.weapon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
        this.weapon.setScale(1 , cursor.x < config.width/2 ? -1 : 1);
        this.weapon.setRotation(angle);
    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {

        
        this.weapon = this.add.container(config.width / 2, config.height / 2);
        
        
        this.butt = this.physics.add
        .image(0, 0, 'butt')
        .setOrigin(1, 0.5);
        this.body = this.physics.add
        .image(0, 0, 'body')
        .setOrigin(0.5);
        this.canon = this.physics.add
        .image(0, 0, 'canon')
        .setOrigin(0, 0.5);
        
        
        this.weapon.addAt(this.body, 0);
        this.weapon.addAt(this.butt, 1);
        this.weapon.addAt(this.canon, 2);
        
        this.butt.x -= this.body.width / 2;
        this.canon.x += this.body.width / 2;
        
        
        this.input.on('pointermove', this.rotateWeaponTowardsMouseAngle , this);
        


        // this.body.x = config.width / 2;
        // this.body.y = config.height / 2;


        // this.weapon.

        var color = Phaser.Display.Color.GetColor32(255, 0, 0, 110);
        this.cameras.main.setBackgroundColor(color);
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {

    }
}