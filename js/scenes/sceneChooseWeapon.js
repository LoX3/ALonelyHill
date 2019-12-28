/**
 * Escena para escoer el arma del usuario
 * @class 
 */
class SceneChooseWeapon extends Phaser.Scene {
    /**
     * Constructor de la escena SceneChooseWeapon
     * @constructor 
     */
    constructor() {
        super(
            {
                key: sceneNames.CHOOSEWEAPON,
            }
        );
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
        this.salir = true;
        this.arrows;

        this.butt = (data.butt == null) ? weaponParts.BUTT.TEN : data.butt;
        this.handle = (data.handle == null) ? weaponParts.HANDLE.ONE : data.handle;
        this.canon = (data.canon == null) ? weaponParts.CANON.SIX : data.canon;
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        // Cambio al escena estado
        gameState = gameStates.CHOOSEWEAPON;

        // Escondo el raton
        showCursor();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        var color = Phaser.Display.Color.GetColor32(0, 0, 0, 120);
        this.cameras.main.setBackgroundColor(color);

        // Cuerpo del arma
        this.handlePart = this.add
            .image(config.width / 2, config.height / 2, this.handle)
            .setOrigin(0.5)
            .setScale(2);
        var handleWidth = this.handlePart.scale * this.handlePart.width;

        // Culata del arma
        this.buttPart = this.add
            .image(config.width / 2 - (handleWidth / 2), config.height / 2, this.butt)
            .setOrigin(1, 0.5)
            .setScale(2);

        // Cañón del arma
        this.canonPart = this.add
            .image(config.width / 2 + (handleWidth / 2), config.height / 2, this.canon)
            .setOrigin(0, 0.5)
            .setScale(2);

        this.arrows = this.add.group();

        // Creo las flechas Y las añado aun grupo
        var { prevButt, prevHandle, prevCanon } = this.createPrevArrows();

        var { nextButt, nextHandle, nextCanon } = this.createNextArrows();

        this.arrows.addMultiple([
            prevButt,
            prevHandle,
            prevCanon,
            nextButt,
            nextHandle,
            nextCanon,
        ]);

        // Recorro el grupo para añadir el mismo evento
        this.arrows.children.each(function (child) {
            child.on('pointerover', function () {
                this.setScale(0.7);
            });

            child.on('pointerout', function () {
                this.setScale(0.5);
            });
        })
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        if (this.salir && this.spaceKey.isDown) {
            this.salir = false;

            this.scene.get(sceneNames.START).player.getAt(1).getAt(0).setTexture(this.butt);
            this.scene.get(sceneNames.START).player.getAt(1).getAt(1).setTexture(this.handle);
            this.scene.get(sceneNames.START).player.getAt(1).getAt(2).setTexture(this.canon);

            hideCursor();

            gameState = gameStates.PLAYING;

            this.scene.stop();
        }
    }

    /**
     * Creo las flechas para cambiar a la siguiente parte del arma
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     */
    createNextArrows() {
        var nextButt = this.add
            .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y + this.buttPart.height * 1.2, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setFlipY(true)
            .setInteractive();
        nextButt.on('pointerdown', function () {
            var buttId;
            var value = this.scene.getNextValue(this.scene.buttPart.texture.key);
            Object.keys(weaponParts.BUTT).find(function (key) {
                if (weaponParts.BUTT[key] == value) {
                    buttId = key;
                    return true;
                }
            });
            this.scene.butt = weaponParts.BUTT[buttId];
            this.scene.buttPart.setTexture(this.scene.butt);
            this.scene.resizeWeapon();
        });
        var nextHandle = this.add
            .image(this.handlePart.x, this.handlePart.y + this.handlePart.height * 1.2, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setFlipY(true)
            .setInteractive();
        nextHandle.on('pointerdown', function () {
            var handleId;
            var value = this.scene.getNextValue(this.scene.handlePart.texture.key);
            Object.keys(weaponParts.HANDLE).find(function (key) {
                if (weaponParts.HANDLE[key] == value) {
                    handleId = key;
                    return true;
                }
            });
            this.scene.handle = weaponParts.HANDLE[handleId];
            this.scene.handlePart.setTexture(this.scene.handle);
            this.scene.resizeWeapon();
        });
        var nextCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y + this.canonPart.height * 1.2, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setFlipY(true)
            .setInteractive();
        nextCanon.on('pointerdown', function () {
            var canonId;
            var value = this.scene.getNextValue(this.scene.canonPart.texture.key);
            Object.keys(weaponParts.CANON).find(function (key) {
                if (weaponParts.CANON[key] == value) {
                    canonId = key;
                    return true;
                }
            });
            this.scene.canon = weaponParts.CANON[canonId];
            this.scene.canonPart.setTexture(this.scene.canon);
            this.scene.resizeWeapon();
        });
        return { nextButt, nextHandle, nextCanon };
    }

    /**
     * Creo las flechas para cambiar a la anterior parte del arma
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     */
    createPrevArrows() {
        var prevButt = this.add
            .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y - this.buttPart.height / 1.3, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setInteractive();
        prevButt.on('pointerdown', function () {
            var buttId;
            var value = this.scene.getPrevValue(this.scene.buttPart.texture.key);
            Object.keys(weaponParts.BUTT).find(function (key) {
                if (weaponParts.BUTT[key] == value) {
                    buttId = key;
                    return true;
                }
            });
            this.scene.butt = weaponParts.BUTT[buttId];
            this.scene.buttPart.setTexture(this.scene.butt);
            this.scene.resizeWeapon();
        });

        var prevHandle = this.add
            .image(this.handlePart.x, this.handlePart.y - this.handlePart.height / 1.3, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setInteractive();
        prevHandle.on('pointerdown', function () {
            var handleId;
            var value = this.scene.getPrevValue(this.scene.handlePart.texture.key);
            Object.keys(weaponParts.HANDLE).find(function (key) {
                if (weaponParts.HANDLE[key] == value) {
                    handleId = key;
                    return true;
                }
            });
            this.scene.handle = weaponParts.HANDLE[handleId];
            this.scene.handlePart.setTexture(this.scene.handle);
            this.scene.resizeWeapon();
        });

        var prevCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y - this.canonPart.height / 1.3, 'next_arrow')
            .setOrigin(0.5, 1)
            .setScale(0.5)
            .setInteractive();
        prevCanon.on('pointerdown', function () {
            var canonId;
            var value = this.scene.getPrevValue(this.scene.canonPart.texture.key);
            Object.keys(weaponParts.CANON).find(function (key) {
                if (weaponParts.CANON[key] == value) {
                    canonId = key;
                    return true;
                }
            });
            this.scene.canon = weaponParts.CANON[canonId];
            this.scene.canonPart.setTexture(this.scene.canon);
            this.scene.resizeWeapon();
        });

        return { prevButt, prevHandle, prevCanon };
    }

    /**
     * Consigo el valor del enum anterior
     * @param {String} value Valor del enum
     */
    getPrevValue(value) {
        var strValue = '';
        value = value.split('_');
        if (value[1] == 1) {
            value[1] = 16;
        }

        strValue = (parseInt(value[1]) - 1).toString();
        return value[0] + '_' + strValue;
    }

    /**
     * Consigo el valor del enum siguiente
     * @param {String} value Valor del enum
     */
    getNextValue(value) {
        var strValue = '';
        value = value.split('_');
        if (value[1] == 15) {
            value[1] = 0;
        }

        strValue = (parseInt(value[1]) + 1).toString();
        return value[0] + '_' + strValue;
    }

    /**
     * Vuelvo a cambiar la posición del arma, para que no se formen errores
     */
    resizeWeapon() {
        // Cuerpo del arma
        this.handlePart.x = config.width / 2;
        this.handlePart.y = config.height / 2;
        this.handlePart.setOrigin(0.5);
        var handleWidth = this.handlePart.scale * this.handlePart.width;

        // Culata del arma
        this.buttPart.x = config.width / 2 - (handleWidth / 2);
        this.buttPart.y = config.height / 2;
        this.buttPart.setOrigin(1, 0.5)

        // Cañón del arma
        this.canonPart.x = config.width / 2 + (handleWidth / 2);
        this.canonPart.y = config.height / 2;
        this.canonPart.setOrigin(0, 0.5);
    }
}