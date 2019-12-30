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
                key: sceneNames.SETUP,
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
    init() {
        this.arrows;

        this.prevButt;
        this.prevHandle;
        this.prevCanon;
        this.nextButt;
        this.nextHandle;
        this.nextCanon; 
        
        this.butt = weaponParts.BUTT.ONE;
        this.handle = weaponParts.HANDLE.ONE;
        this.canon = weaponParts.CANON.ONE;
        
        this.verticalMargin = 50;
        this.horizontalMargin = 35;
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

    /**
     * Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {
        showCursor();

        
        //Asignamos el estado del juego
        gameState = gameStates.PRELOAD;
        
        //Set background color (temporal)
        var color = Phaser.Display.Color.GetColor32(109, 247, 177, 0);
        this.cameras.main.setBackgroundColor(color);
        
        // Cuerpo del arma
        this.handlePart = this.add
        .image((config.width / 4) * 3, (config.height / 4) +20, this.handle)
        .setOrigin(0.5)
        .setScale(1.5);
        var handleWidth = this.handlePart.scale * this.handlePart.width;
        
        // Culata del arma
        this.buttPart = this.add
        .image(this.handlePart.x - (handleWidth / 2) - 40, this.handlePart.y, this.butt)
        .setOrigin(1, 0.5)
        .setScale(1.5);
        
        // Cañón del arma
        this.canonPart = this.add
        .image(this.handlePart.x + (handleWidth / 2) + 40, this.handlePart.y, this.canon)
        .setOrigin(0, 0.5)
        .setScale(1.5);
            

        var graphics = this.add.graphics({ lineStyle: { width: 5, color: 0x000000 }, fillStyle: { color: 0xff0000 }});
        // var rect = new Phaser.Geom.Rectangle(((config.width / 4) * 2) + this.margin, ((config.width / 4) * 4) - this.margin, 100, 100);
        var rect = new Phaser.Geom.Rectangle((config.width / 4) * 2 + this.horizontalMargin, this.verticalMargin  +20, (config.width / 2) - 80 ,100);
        graphics.strokeRectShape(rect);
            
        // Creo las flechas Y las añado aun grupo
        this.arrows = this.createArrows();
        
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.scene.get(sceneNames.SETUP).buttPart.setTexture(this.butt);
        // this.scene.get(sceneNames.SETUP).player.getAt(1).getAt(1).setTexture(this.handle);
        // this.scene.get(sceneNames.SETUP).player.getAt(1).getAt(2).setTexture(this.canon);
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
    createArrows() {

        // for (let i = 0; i < 6; i++) {
        //     var arrow;
        //     // console.log(arrow);
            
        //     if (i>= 0 && i<=2){
        //         console.log('hi');
        //         var value = this.getNextValue(this.buttPart.texture.key);
        //         console.log(value);
        //         arrow = this.add.image((this.buttPart.x - 35) + ((i) * (this.buttPart.width + 25) * this.buttPart.scale),this.buttPart.y + (this.buttPart.height ), 'arrow')
        //         .setOrigin(0.5, 0)
        //         .setScale(0.5)
        //         .setFlipY(true)
        //         .setInteractive()       
        //         .on('pointerdown', function (id = 'hola') {  
        //             console.log(id);
                              
        //             var buttId;
        //             var value = this.scene.getNextValue(this.scene.buttPart.texture.key);
        //             console.log(value);
                    
        //             Object.keys(weaponParts.BUTT).find(function (key) {
        //                 if (weaponParts.BUTT[key] == value) {
        //                     buttId = key;
        //                     return true;
        //                 }
        //             });
        //             this.scene.butt = weaponParts.BUTT[buttId];
        //             this.scene.buttPart.setTexture(value);
        //         });
        //         arrow.on('pointerover', function () {
        //             this.setScale(0.7);
        //         });
        //         arrow.on('pointerout', function () {
        //             this.setScale(0.5);
        //         });
        //     }
        //     else if (i>= 3 && i<=5) {

        //     }
            
        // }
        

        var nextButt = this.add
        .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y + this.buttPart.height * 1.4, 'arrow')
        .setOrigin(0.5, 0)
        .setScale(0.5)
        .setFlipY(true)
        .setInteractive();
        
        var nextHandle = this.add
            .image(this.handlePart.x, this.handlePart.y + this.handlePart.height * 1.4, 'arrow')
            .setOrigin(0.5, 0)
            .setScale(0.5)
            .setFlipY(true)
            .setInteractive();
            
        var nextCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y + this.canonPart.height * 1.4, 'arrow')
            .setOrigin(0.5, 0)
            .setScale(0.5)
            .setFlipY(true)
            .setInteractive();
        
        nextButt.on('pointerdown', function () {            
            var buttId;
            var value = this.scene.getNextValue(this.scene.buttPart.texture.key);
            console.log(value);
            
            Object.keys(weaponParts.BUTT).find(function (key) {
                if (weaponParts.BUTT[key] == value) {
                    buttId = key;
                    return true;
                }
            });
            this.scene.butt = weaponParts.BUTT[buttId];
            this.scene.buttPart.setTexture(this.scene.butt);
            
        });
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
        
        var prevButt = this.add
            .image(this.buttPart.x - this.handlePart.width / 2, this.buttPart.y - this.buttPart.height / 1.3, 'arrow')
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
            
        });

        var prevHandle = this.add
            .image(this.handlePart.x, this.handlePart.y - this.handlePart.height / 1.3, 'arrow')
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
            
        });

        var prevCanon = this.add
            .image(this.canonPart.x + this.handlePart.width / 2, this.canonPart.y - this.canonPart.height / 1.3, 'arrow')
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
            
        });

        this.arrowGroup = this.add.group();
        
        this.arrowGroup.addMultiple(
            this.prevButt,
            this.prevHandle,
            this.prevCanon,
            this.nextButt,
            this.nextHandle,
            this.nextCanon,
        );
        
        return this.arrowGroup;
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

    
}