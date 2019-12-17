/**
 * @class Se cargan los assets del juego
 */
class ScenePreload extends Phaser.Scene {
    /**
     * @constructor Constructor de la escena
     */
    constructor() {
        super(
            {
                key: 'ScenePreload',
            }
        )
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
        this.load.image('part1', '../../assets/weapons_merge/Part1/12.png');
        this.load.image('part2', '../../assets/weapons_merge/Part2/1.png');
        this.load.image('part3', '../../assets/weapons_merge/Part3/1.png');
    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        var image1 = this.physics.add
            .image(200, 200, 'part1')
            .setOrigin(0.5);
        var image2 = this.physics.add
            .image(200, 200, 'part2')
            .setOrigin(0.5);
        var image3 = this.physics.add
            .image(200, 200, 'part3')
            .setOrigin(0.5);

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