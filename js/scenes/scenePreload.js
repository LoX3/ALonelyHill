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
            this.load.image( "butt_" + bt, '../../assets/weapons/BUTT/' + id + '.png');
            i++;
            console.log(" LOADED: butt_" + bt + " | with route : " + '../../assets/weapons/BUTT/' + id + '.png' );
            
        }
        
        //Load body parts
        i = 0;
        for (let bd in weaponParts.BODY) {
            var id = weaponParts.BODY[bd];
            this.load.image( "body_" + bd, '../../assets/weapons/BODY/' + id + '.png');
            i++;
            console.log(" LOADED: body_" + bd + " | with route : " + '../../assets/weapons/BODY/' + id + '.png' );
            
        }
        
        //Load canon parts
        i = 0;
        for (let c in weaponParts.CANON) {
            var id = weaponParts.CANON[c];
            this.load.image( "canon_" + c, '../../assets/weapons/CANON/' + id + '.png');
            i++;
            console.log(" LOADED: canon_" + c + " | with route : " + '../../assets/weapons/CANON/' + id + '.png' );

        }
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
        this.weapon.setScale(1 , cursor.x < config.width/2 ? -1 : 1);
        this.weapon.setRotation(angle);
    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        var butt = this.physics.add
            .image(0, 0, 'butt_ONE')
            .setOrigin(1, 0.5);
        var body = this.physics.add
            .image(0, 0, 'body_ONE')
            .setOrigin(0.5);
        var canon = this.physics.add
            .image(0, 0, 'canon_ONE')
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