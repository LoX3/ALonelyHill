/**
 * @class Escena principal del juego
 */
class SceneStart extends Phaser.Scene {

    /**
     * Escena principal del juego
     * @constructor
     */
    constructor() {
        super({
            key: sceneNames.GAME
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
    init(data) {
        this.player;
        this.enemies;

        this.butt = (data.butt == null) ? weaponParts.BUTT.ONE : data.butt;
        this.handle = (data.handle == null) ? weaponParts.HANDLE.ONE : data.handle;
        this.canon = (data.canon == null) ? weaponParts.CANON.ONE : data.canon;
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        // Asigno un color de fondo a la cámara
        var color = Phaser.Display.Color.GetColor32(109, 247, 177, 0);
        this.cameras.main.setBackgroundColor(color);


        // Creo los cursores para juegar
        this.leerTeclado();

        this.crearMapa();

        // Creo el array de enemgios
        this.enemies = [];

        this.player = new Player(
            this,
            0,
            0,
            'sensei',
            {
                butt: this.butt,
                handle: this.handle,
                canon: this.canon
            }
        );

        cliente.registerPlayer({
            x: this.player.x,
            y: this.player.y,
            butt: this.butt,
            handle: this.handle,
            canon: this.canon,
        });

        gameState = gameStates.PLAYING;
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        // Si podemos jugar...
        if (gameState == gameStates.PLAYING) {
            // Al pulsar la tecla ESC...
            if (!this.chooseWeapon && this.escKey.isDown) {
                // Abro la escena para cambiar el arma
                this.scene.launch(sceneNames.CHOOSEWEAPON, {
                    butt: this.butt,
                    handle: this.handle,
                    canon: this.canon,
                });
            }

            // Hago el update del player
            this.player.update();
        }
    }

    /**
     * Crea un enemigo en la escena
     * @param {number} id Id del enemigo
     * @param {Number} x Posición horizontal del enemigo
     * @param {Number} y Posición vertical del enemigo
     */
    addNewEnemy(id, x, y) {
        var weaponComponents = {
            butt: weaponParts.BUTT.ONE,
            handle: weaponParts.HANDLE.ONE,
            canon: weaponParts.CANON.ONE,
        }

        this.enemies[id] = new Enemy(this, x, y, 'sensei', weaponComponents);
    }

    /**
     * Creo y pongo el mapa en escena
     */
    crearMapa() {
        this.map = this.make.tilemap({
            data: new ManagerMapas().getLevel(0),
            tileWidth: 32,
            tileHeight: 32,
        });
        // Creamos el tileset de la imagen
        const tileset = this.map.addTilesetImage('genericRPG');

        // Creo una capa, donde se ponen las plataformas
        this.platformsLayer = this.map.createStaticLayer(0, tileset, 0, 0);

        // Tengo que poner las colisiones de esta forma, ya que necesito el json al generar el mapa... lo que no funciona
        // this.platformsLayer.setCollisionBetween(12, 130);
        // this.platformsLayer.setCollisionBetween(364, 370);

        // this.setTopCollisionTiles(369);
        // this.setTopCollisionTiles(365);
        // this.setTopCollisionTiles(367);
        // this.setTopCollisionTiles(26);
        // this.setTopCollisionTiles(28);
        // this.setTopCollisionTiles(30);

        // Muestra los colliders del mapa
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.platformsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
    }

    /**
     * Creo las teclas en la escena para poder jugar
     */
    leerTeclado() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    /**
     * Magia Pura
     * Con el indice del tilemap, le doy colisiones solo por arriba, eso hace que el caballero no se caiga
     * @param {Tile} tileIndex Indice del tilemap
     */
    setTopCollisionTiles(tileIndex) {
        var x, y, tile;

        for (x = 0; x < this.map.width; x++) {
            for (y = 1; y < this.map.height; y++) {
                tile = this.map.getTileAt(x, y);
                if (tile !== null) {
                    if (tile.index == tileIndex) {
                        tile.setCollision(false, false, true, false);
                    }
                }
            }
        }
    }
}
