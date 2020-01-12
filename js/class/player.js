/**
 * @class Player - Jugador del juego
 *
 * @param {Phaser.Scene} scene 
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} characterImage
 * @param {JSON} weaponComponents
 * @param {string} weaponComponents.butt
 * @param {string} weaponComponents.handle
 * @param {string} weaponComponents.canon
 */
class Player extends Phaser.GameObjects.Container {
    /**
     * Constructor del jugador
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se pone el jugador
     * @param {Number} x Posicion horizontal del contenedor
     * @param {Number} y Posicion vertical del contenedor
     * @param {String} characterImage Imagen el jugador
     * @param {JSON} weaponComponents Componentes del arma
     * @param {string} weaponComponents.butt Culata del arma
     * @param {string} weaponComponents.handle Cuerpo del arma
     * @param {string} weaponComponents.canon Cañon del arma
     */
    constructor(scene, x, y, characterImage, weaponComponents) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);
        // Creo las variables de la clase
        this.init();

        this.name = 'player';

        // Guardo la escena
        this.scene = scene;
        // Guardo los componentes del arma
        this.weaponComponents = weaponComponents;
        // Establezco la velocidad del jugador
        this.playerSpeed = 250;
        // True right - false left
        this.playerSide = false;
        // Guardo la escena de UI
        this.sceneGameUI = scene.scene.get(sceneNames.GAMEUI);
        // Doy vida al player para que inicie como numero
        this.vida = 0;
        // Doy vida al jugador
        this.manageLive(100);

        // Le doy fisicas al container para que entre tenga colliders i se mueva
        scene.physics.world.enableBody(this);

        // Creo el jugador
        this.crearCharacter(scene, characterImage);

        // Creo el arma
        this.crearWeapon(scene);

        // Añado el container a la escena
        scene.add.existing(this);

        // Hago que la cámara siga al jugador, y la centro un poco
        // ESTO EN UN FUTURO: LA CAMARA APUNTA ENTRE EL JUGADOR Y EL PUNTERO
        scene.cameras.main
            .startFollow(this)
            .setFollowOffset(-(this.character.scale * this.character.width), -(this.character.scale * this.character.height));
    }

    /**
     * Init es la primera función que se llama cuando se
     * inicia su estado. Se llama antes de precargar, crear o cualquier
     * otra cosa. Si necesita enrutar el juego a otro estado, puede
     * hacerlo aquí, o si necesita preparar un conjunto de variables u
     * objetos antes de que comience la precarga.
     */
    init() {
        /**
         * Escena donde se ejecuta el juego
         * @type {Phaser.Scene}
         */
        this.scene;

        /**
         * Escena donde se encuentra la UI del usuario
         * @type {Phaser.Scene}
         */
        this.sceneGameUI;

        /**
         * Imagen del jugador en el juego
         * @type {Character} 
         */
        this.character;

        /**
        * Partes del arma
        * @enum {String} 
        * @name weaponComponents 
        * @property {String} butt Culata del arma
        * @property {String} handle Cuerpo del arma
        * @property {String} canon Cañon del arma
        */
        this.weaponComponents;

        /**
         * Arma del jugador
         * @type {Weapon} 
         */
        this.weapon;

        /** 
         * Variable que guarda las keys que usa el player
         * @enum {JSON}
         * @name keys 
         * @property {Phaser.Input.Keyboard} W Movimiento hacia arriba
         * @property {Phaser.Input.Keyboard} A Movimiento hacia izquierda
         * @property {Phaser.Input.Keyboard} S Movimiento hacia abajo
         * @property {Phaser.Input.Keyboard} D Movimiento hacia derecha
         */
        this.keys = {
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        /**
         * Posicion a la que mira el jugador
         * @type {Boolean}
         */
        this.playerSide;

        /**
         * Vida del jugador
         * @type {Number}
         */
        this.playerSpeed;

        /**
         * Vida del jugador
         * @type {Number}
         */
        this.vida;
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        if (this.vida > 0) {
            // Hago el update del hijo
            this.weapon.update();

            // Muevo al jugador
            this.playerMovement();

            // Muevo el jugador segun su fuerza
            cliente.movePlayer(this.x, this.y, this.weapon.rotation);
        }
    }

    /**
     * Creo la imagen del jugador
     * @param {Phaser.Scene} scene Escena donde se crean las imagenes
     * @param {String} characterImage String con el id del asset para cargar
     */
    crearCharacter(scene, characterImage) {
        this.character = new Character(scene, this.body.width / 2, this.body.height / 2);

        // Añado el jugador como hijo para que copie el movimiento del padre
        this.addAt(this.character, 0);
    }

    /** 
     * Creo el arma para el jugador
     * @param {Phaser.Scene} scene Escena donde se crean las imágenes
     */
    crearWeapon(scene) {
        // Culata del arma
        var butt = scene.add
            .image(0, 0, this.weaponComponents.butt)
            .setOrigin(1, 0.5)
            .setScale(0.35)
            .setDataEnabled();

        // Cuerpo del arma
        var handle = scene.add
            .image(0, 0, this.weaponComponents.handle)
            .setOrigin(0.5)
            .setScale(0.35)
            .setDataEnabled();

        // Cañón del arma
        var canon = scene.add
            .image(0, 0, this.weaponComponents.canon)
            .setOrigin(0, 0.5)
            .setScale(0.35)
            .setDataEnabled();

        this.setDataInitialized(butt);
        this.setDataInitialized(handle);
        this.setDataInitialized(canon);

        var parts_id = {
            butt: this.weaponComponents.butt.split('_')[1],
            handle: this.weaponComponents.handle.split('_')[1],
            canon: this.weaponComponents.canon.split('_')[1],
        }

        // Butt
        if (parts_id.butt > 0 && parts_id.butt <= 5) {
            console.log('Entre 0 y 5');
            butt.data.values.bulletDamage.damage = 2;
        }
        else if (parts_id.butt > 5 && parts_id.butt <= 10) {
            console.log('Entre 5 y 10');
        }
        else if (parts_id.butt > 10 && parts_id.butt <= 15) {
            console.log('Entre 10 y 15');
        }

        // Handle
        if (parts_id.handle > 0 && parts_id.handle <= 5) {
            console.log('Entre 0 y 5');
            handle.data.values.bulletDamage.damage = 2;
        }
        else if (parts_id.handle > 5 && parts_id.handle <= 10) {
            console.log('Entre 5 y 10');
        }
        else if (parts_id.handle > 10 && parts_id.handle <= 15) {
            console.log('Entre 10 y 15');
        }

        // Canon
        if (parts_id.canon > 0 && parts_id.canon <= 5) {
            console.log('Entre 0 y 5');
            canon.data.values.bulletDamage.damage = 2;
        }
        else if (parts_id.canon > 5 && parts_id.canon <= 10) {
            console.log('Entre 5 y 10');
        }
        else if (parts_id.canon > 10 && parts_id.canon <= 15) {
            console.log('Entre 10 y 15');
        }

        // Creo el arma y la guardo en una variable publica para poder declararla luego
        this.weapon = new Weapon(
            scene,
            this.body.width / 2,
            this.body.height / 2,
            butt,
            handle,
            canon,
            'bullet'
        );

        // Añado el arma como hijo para que copie el movimiento del padre
        this.addAt(this.weapon, 1);
    }

    /**
     * Restablece a normal el valor de una parte del arma
     * @param {Phaser.GameObjects.Image} part Parte de un arma
     */
    setDataInitialized(part) {
        part.setData({
            bulletDamage: {
                damage: 1,
                criticChange: 1,
                criticDamage: 1,
            },
            fireRate: 1,
            reloadTime: 1,
            precision: 1,
        });
    }

    /**
     * Mueve el jugador segun las teclas pulsadas
     */
    playerMovement() {
        let lastAnimKey = this.character.anims.getCurrentKey();
        let lastSide = this.playerSide;
        if (this.keys.A.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
            if (this.keys.W.isUp && this.keys.S.isUp) {
                this.character.playRunLeft();
                this.playerSide = false;
            }
        }
        else if (this.keys.D.isDown) {
            this.body.setVelocityX(this.playerSpeed);
            if (this.keys.W.isUp && this.keys.S.isUp) {
                this.character.playRunRight();
                this.playerSide = true;
            }
        }
        else {
            this.body.setVelocityX(0);
        }

        if (this.keys.W.isDown) {
            this.body.setVelocityY(-this.playerSpeed);
            this.character.playRunUp();
            this.sendToBack(this.weapon);
        }
        else if (this.keys.S.isDown) {
            this.body.setVelocityY(this.playerSpeed);
            this.character.playRunDown();
            this.sendToBack(this.character);
        }
        else {
            this.body.setVelocityY(0);
        }

        if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
            switch (this.character.anims.getCurrentKey()) {
                case 'run_back':
                    this.character.playIdleUp();
                    this.sendToBack(this.weapon);
                    break;
                case 'run_front':
                    this.character.playIdleDown();
                    this.sendToBack(this.character);
                    break;
                case 'run_side':
                    if (this.playerSide != null) {
                        if (this.playerSide) {
                            this.character.playIdleRight();
                        }
                        else {
                            this.character.playIdleLeft();
                        }
                    }
                    break;
            }
        }

        if (lastAnimKey != this.character.anims.getCurrentKey() || lastSide != this.playerSide) {
            cliente.changeAnimation({
                side: this.playerSide,
                animation: this.character.anims.getCurrentKey()
            });
        }
    }

    /**
     * Modifico el texto del cargador
     */
    updateLiveText() {
        this.sceneGameUI.updateLiveText(this.vida);
    }

    /**
     * Al ser golpeado por una bala
     * @param {Bullet} bullet Bala que golpea
     */
    takeDamage(bullet) {
        // Destruyo la bala
        var damage = bullet.damage.damage;
        if (Math.floor(Math.random() * 99) <= bullet.damage.criticChange) {
            damage += bullet.damage.criticDamage
        }

        this.manageLive(-damage);

        bullet.destroy();
    }

    /**
     * Cambia la vida del jugador y actualiza el texto de la UI
     * @param {Number} vida Vida que se le añade o reduce al enemigo
     */
    manageLive(vida) {
        // Cambio la vida
        this.vida += vida;

        // Actualizo el texto
        this.updateLiveText();

        if (this.vida <= 0) {
            this.disabePlayer();
        }
    }

    /**
     * Implementa la muerte del jugador
     */
    disabePlayer() {
        this.body.setEnable(false);
        cliente.socket.disconnect();
        this.scene.scene.launch(sceneNames.GAMEOVER);
    }
}