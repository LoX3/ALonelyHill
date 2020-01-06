/**
 * Escena para escoer el arma del usuario
 * @class 
 */
class SceneSetUp extends Phaser.Scene {
    /**
     * Constructor de la escena SceneSetUp
     * @constructor 
     */
    constructor() {
        super({
            key: sceneNames.SETUP,
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
    init() {
        this.weaponConstructorArrows;

        this.butt = weaponParts.BUTT.ONE;
        this.handle = weaponParts.HANDLE.ONE;
        this.canon = weaponParts.CANON.ONE;

        this.verticalMargin = 50;
        this.horizontalMargin = 35;
    }

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        //Asignamos el estado del juego
        gameState = gameStates.MENU;

        showCursor();

        this.add.text((config.width / 4) * 1, -10, 'player', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (76),
            color: "#000"
        })
            .setOrigin(0.5, 0);

        this.add.text((config.width / 4) * 3, -10, 'gear', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (76),
            color: "#000"
        })
            .setOrigin(0.5, 0);

        var txtMenuTitle = this.add.text(config.width / 2, config.height, 'GO!', {
            align: "center",
            fontFamily: '"iPixelU"',
            fontSize: (76),
            color: "#000"
        })
            .setInteractive()
            .setOrigin(0.5, 1);

        txtMenuTitle.on('pointerdown', function () {
            this.scene.startGame();
        });

        //Set background color (temporal)
        var color = Phaser.Display.Color.GetColor32(109, 247, 177, 0);
        this.cameras.main.setBackgroundColor(color);

        this.setUpWeaponConstructor();

        this.setUpCharacterSelector();

        this.input.keyboard.on('keydown-' + 'SPACE', function (event) {
            this.scene.startGame();
        });
    }

    /**
     * Vuelvo a cambiar la posición del arma, para que no se formen errores
     */
    displayWeapon() {
        // Cuerpo del arma
        this.handlePart.x = (config.width / 4) * 3;
        this.handlePart.y = config.height / 4;
        this.handlePart.setOrigin(0.5);
        var handleWidth = this.handlePart.scale * this.handlePart.width;

        // Culata del arma
        this.buttPart.x = this.handlePart.x - (handleWidth / 2) - 20;
        this.buttPart.y = this.handlePart.y;
        this.buttPart.setOrigin(1, 0.5)

        // Cañón del arma
        this.canonPart.x = this.handlePart.x + (handleWidth / 2) + 20;
        this.canonPart.y = this.handlePart.y;
        this.canonPart.setOrigin(0, 0.5);
    }

    setUpWeaponContainer() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0x000000
            },
            fillStyle: {
                color: 0xff0000
            }
        });
        // var rect = new Phaser.Geom.Rectangle(((config.width / 4) * 2) + this.margin, ((config.width / 4) * 4) - this.margin, 100, 100);
        var rect = new Phaser.Geom.Rectangle((config.width / 4) * 2 + this.horizontalMargin, (config.height / 8) * 3, (config.width / 2) - 80, 100);
        graphics.strokeRectShape(rect);

    }

    setUpPartChangerArrows() {

        // Creo las flechas Y las añado aun grupo
        var {
            prevButt,
            prevHandle,
            prevCanon
        } = this.createPrevArrows();

        var {
            nextButt,
            nextHandle,
            nextCanon
        } = this.createNextArrows();

        this.weaponConstructorArrows = this.add.group();

        this.weaponConstructorArrows.addMultiple([
            prevButt,
            prevHandle,
            prevCanon,
            nextButt,
            nextHandle,
            nextCanon,
        ]);

        // Recorro el grupo para añadir el mismo evento
        this.weaponConstructorArrows.children.each(function (child) {
            child.on('pointerover', function () {
                this.setScale(0.45);
            });

            child.on('pointerout', function () {
                this.setScale(0.3);
            });
        })
    }

    setUpWeaponConstructor() {
        // Cuerpo del arma
        this.handlePart = this.add
            .image((config.width / 4) * 3, (config.height / 2), this.handle)
            .setOrigin(0.5)
            .setScale(1.3);
        var handleWidth = this.handlePart.scale * this.handlePart.width;

        // Culata del arma
        this.buttPart = this.add
            .image(this.handlePart.x - (handleWidth / 2) - 40, this.handlePart.y, this.butt)
            .setOrigin(1, 0.5)
            .setScale(1.3);

        // Cañón del arma
        this.canonPart = this.add
            .image(this.handlePart.x + (handleWidth / 2) + 40, this.handlePart.y, this.canon)
            .setOrigin(0, 0.5)
            .setScale(1.3);

        this.setUpWeaponContainer();

        this.setUpPartChangerArrows();
    }

    setUpCharacterSelector() {

        this.createAnimations();

        var characterSprite = this.physics.add.sprite(config.width / 4, (config.height / 2) * 1, 'character_selector')
            .setSize(16, 32)
            .setScale(3)
            .setInteractive();

        characterSprite.play('idle_front');

        characterSprite.on('pointerover', function () {
            this.play('run_front');
        });

        characterSprite.on('pointerout', function () {
            this.play('idle_front');
        });

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

    /**
     * Creo las flechas para cambiar a la siguiente parte del arma
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     */
    createNextArrows() {
        var nextButt = this.add
            .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y + this.buttPart.height, 'arrow')
            .setOrigin(0.5, 0)
            .setScale(0.3)
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
        });
        var nextHandle = this.add
            .image(this.handlePart.x, this.handlePart.y + this.handlePart.height, 'arrow')
            .setOrigin(0.5, 0)
            .setScale(0.3)
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
        });
        var nextCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y + this.canonPart.height, 'arrow')
            .setOrigin(0.5, 0)
            .setScale(0.3)
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
        });
        return {
            nextButt,
            nextHandle,
            nextCanon
        };
    }

    /**
     * Creo las flechas para cambiar a la anterior parte del arma
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     * @returns {Phaser.GameObjects.Image}
     */
    createPrevArrows() {
        var prevButt = this.add
            .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y - this.buttPart.height, 'arrow')
            .setOrigin(0.5, 1)
            .setScale(0.3)
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

        });

        var prevHandle = this.add
            .image(this.handlePart.x, this.handlePart.y - this.handlePart.height, 'arrow')
            .setOrigin(0.5, 1)
            .setScale(0.3)
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

        });

        var prevCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y - this.canonPart.height, 'arrow')
            .setOrigin(0.5, 1)
            .setScale(0.3)
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

        });

        return {
            prevButt,
            prevHandle,
            prevCanon
        };
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
     * Empieza el juego
     */
    startGame() {
        this.scene.launch(sceneNames.GAMEUI);

        this.scene.start(sceneNames.GAME, {
            butt: this.butt,
            handle: this.handle,
            canon: this.canon,
        });

        this.scene.stop();
    }
}