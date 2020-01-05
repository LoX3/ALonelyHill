/**
 * @class Weapon - Arma del jugador
 *
 * @param {Phaser.Scene} scene 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Phaser.GameObjects.Image} butt 
 * @param {Phaser.GameObjects.Image} handle 
 * @param {Phaser.GameObjects.Image} canon 
 * @param {Phaser.GameObjects.Sprite} bulletType 
 */
class Weapon extends Phaser.GameObjects.Container {
    /**
     * Constructor del arma del jugador
     * @constructor 
     * @param {Phaser.Scene} scene Escena donde se pone el arma
     * @param {Number} x Posicion horizontal del contenedor
     * @param {Number} y Posicion vertical del contenedor
     * @param {Phaser.GameObjects.Image} butt Culata del arma
     * @param {Phaser.GameObjects.Image} handle Parte central del arma
     * @param {Phaser.GameObjects.Image} canon Cañon del arma
     * @param {Phaser.GameObjects.Sprite} bulletType Tipo de bala que dispara el arma
     */
    constructor(scene, x, y, butt, handle, canon, bulletType) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);
        // Creo las variables de la clase
        this.init();
        // Guardo la escena en la que estamos
        this.scene = scene;
        // Pongo valor al tipo de bala
        this.bulletType = bulletType;
        // Offset para que la bala salga del cañon
        this.canonOffset = 100;
        // Hago que se pueda disparar
        this.canShoot = true;
        // Escena con la UI del juego
        this.sceneGameUI = scene.scene.get(sceneNames.GAMEUI);
        // Cargador del arma
        this.cargador = new GunReloader(5, 50);
        // Muestro las balas en la pantalla
        this.updateReloaderText();

        // Al hacer scale de las partes del arma, no quedan bien, con esto se arregla
        var handleWidth = handle.scale * handle.width;
        var canonWidth = canon.scale * canon.width;
        // Pongo las armas en posición
        butt.x -= (handleWidth / 2);
        canon.x += (handleWidth / 2);

        butt.y += 8;
        handle.y += 8;
        canon.y += 8;

        // Pongo las armas como hijos
        this.addAt(butt, 0);
        this.addAt(handle, 1);
        this.addAt(canon, 2);

        // Creo el grupo para guardar las balas
        this.bulletGroup = scene.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Creo un objeto vacio para que la bala salga y lo pongo como hijo
        var shootPosX = canonWidth + (handleWidth / 2);
        this.shootPos = scene.physics.add.image(0, 0);
        this.shootPos.setSize(1, 1);
        this.addAt(this.shootPos, 3);

        // Imagen del puntero
        this.puntero = scene.add.image(0, 0, 'scope');
        this.puntero.setScale(0.7);
        this.puntero.setDepth(10);
        // Scroll factor sirve para que no se mueva al cambiar la cámara de posicion
        this.puntero.setScrollFactor(0);

        // Al hacer click con el ratón, disparo 
        scene.input.on('pointerdown', this.shoot, this);

        // Creo las variables para conseguir posiciones absolutas
        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
        this.tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix();
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
         * Grupo donde se guardan las balas
         * @type {Phaser.GameObjects.Group}
         * @property {JSON} groupConfig Opciones del grupo
         * @property {Bullet} groupConfig.classType Define el tipo de clase en el grupo {@link Phaser.GameObjects.Group#classType}.
         * @property {Boolean} groupConfig.runChildUpdate Hace que se ejecuten los updates de los elementos dentro del grupo {@link Phaser.GameObjects.Group#runChildUpdate}.
         */
        this.bulletGroup;

        /**
         * Tipo de bala que se dispara
         * @type {String} 
         */
        this.bulletType;

        /**
         * Final del cañon del arma por donde sale la bala
         * @type {Phaser.GameObjects.Image}
         */
        this.shootPos;

        /**
         * Offset para que concuerde del final del cañon verticalmente
         * @type {Number} 
         */
        this.canonOffset;

        /**
         * Se utiliza para cojer la posición absoluta de @var this.shootPos
         * @type {Phaser.GameObjects.Components.TransformMatrix} 
         */
        this.tempMatrix;

        /**
         * Se utiliza para cojer la posición absoluta de @var this.shootPos
         * @type {Phaser.GameObjects.Components.TransformMatrix} 
         */
        this.tempParentMatrix;

        /**
         * Obtiene los valores absolutos del punto de salida de la bala
         * @type {Number} 
         */
        this.absoluteShootPos;

        /**
         * Controla que se pueda disparar
         * @type {Boolean} 
         */
        this.canShoot;

        /**
         * Cargador del jugador
         * @type {GunReloader}
         */
        this.cargador;

        /**
         * Distancia que recorre el arma con el recoil
         * @type {Number}
         */
        this.recoilDistance = 5;

        // IVAN COMENTA!!!!!
        /**
         * ALGO
         * @type {Number}
         */
        this.lerp = 2;

        /**
         * ALGO
         * @type {Number}
         */
        this.time = 0.05;

        /**
         * ALGO
         * @type {Boolean}
         */
        this.gotInitialPos = false;

        /**
         * ALGO
         * @type {Boolean}
         */
        this.arrievedMaximumDisplacement = false;
    }

    /**
     * Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.shootPos.getWorldTransformMatrix(this.tempMatrix, this.tempParentMatrix);
        this.absoluteShootPos = this.tempMatrix.decomposeMatrix();
        this.rotateWeaponTowardsMouseAngle(this.scene.input);
        if (this.knockBack) {
            this.playRecoilAnim();
        }
    }

    /**
     * Rota el objeto arma hacia el puntero
     * @param {Phaser.Input.Pointer} pointer Puntero del ratón
     */
    rotateWeaponTowardsMouseAngle(pointer) {
        let cursor = pointer;

        var axisX = this.parentContainer.x + this.x;
        var axisY = this.parentContainer.y + this.y;

        this.puntero.x = cursor.x;
        this.puntero.y = cursor.y;

        let angle = this.getRotationToPointer(axisX, axisY);

        // Si la rotacion es mas de 1.5 significa que ha de cambiar
        if (Math.abs(angle) > 1.5) {
            this.setScale(1, -1);
        } else {
            this.setScale(1, 1);
        }

        this.setRotation(angle);
    }

    /**
     * Obtengo la rotacion de una posición a la imagen del puntero
     * @param {Number} originX Origen del calculo de la rotacion en el eje horizonatal
     * @param {Number} originY Origen del calculo de la rotacion en el eje vertical
     */
    getRotationToPointer(originX, originY) {
        let angle = Phaser.Math.Angle.Between(originX, originY, this.puntero.x + this.scene.cameras.main.scrollX, this.puntero.y + this.scene.cameras.main.scrollY);
        // console.log(angle);

        return angle;
    }

    /**
     * Disparo del arma hacia el puntero
     */
    shoot() {
        if (this.canShoot && this.cargador.canShoot()) {
            this.canShoot = false;
            this.cargador.shoot();
            this.updateReloaderText();

            var shootRotation = this.getRotationToPointer(this.absoluteShootPos.translateX, this.absoluteShootPos.translateY);

            var bala = new Bullet(this.scene, this.absoluteShootPos.translateX, this.absoluteShootPos.translateY, this.bulletType, shootRotation);
            this.bulletGroup.add(bala);
            bala.body.setSize(7, 7);

            this.scene.time.delayedCall(100, () => this.canShoot = true);
            this.knockBack = true;

            if (!this.cargador.canShoot()) {
                this.sceneGameUI.enableReloadAlert();
            }
        }
    }

    /**
     * Recargo las balas del arma
     */
    reload() {
        if (this.canShoot && !this.cargador.isEmpty()) {
            this.canShoot = false;
            this.cargador.reload();
            this.scene.time.delayedCall(1000, this.allowReload, [], this);
            this.sceneGameUI.setReloadState();
        }
    }

    /**
     * Al recargar y esperar el tiempo de recarga entra aqui
     * @event allowReload
     */
    allowReload() {
        this.sceneGameUI.disableReloadAlert();
        this.canShoot = true;
        this.updateReloaderText();
    }

    /**
     * Modifico el texto del cargador
     */
    updateReloaderText() {
        this.sceneGameUI.gunReloaderText.setText(this.cargador.currentBullets + '/' + this.cargador.totalBullets);
    }

    /**
     * Se ejecuta la animación de disparar
     */
    playRecoilAnim() {

        if (!this.gotInitialPos) {
            this.rotationInfo = this.getRotationToPointer(this.absoluteShootPos.translateX, this.absoluteShootPos.translateY);
            this.lerp = 1.5;
            this.time = 0.3;
            this.gotInitialPos = true;
            this.arrievedMaximumDisplacement = false;

        }

        var PI = Phaser.Math.PI2 / 2;

        var xDisplacement = (((this.rotationInfo * 100) / (PI / 2)) / 100) + 1;
        if (xDisplacement > 1) {
            xDisplacement = (((this.rotationInfo * -100) / (PI / 2)) / 100) + 1;
        } else if (xDisplacement < -1) {
            xDisplacement = (((this.rotationInfo * 100) / (PI / 2)) / 100) + 1;
        }

        var yDisplacement = (((this.rotationInfo * -100) / (PI / 2)) / 100);
        if (yDisplacement > 1) {
            yDisplacement = (((-this.rotationInfo * -100) / (PI / 2)) / 100) + 2;
        } else if (yDisplacement < -1) {
            yDisplacement = (((-this.rotationInfo * -100) / (PI / 2)) / 100) - 2;
        }

        if (!this.arrievedMaximumDisplacement) {

            // if (this.time >= 1) {
            //     this.time -= 0.01;
            // } else {
            //     // console.log(this.time);

            // }
            this.lerp -= Phaser.Math.Linear(0, 1, this.time);

            // console.log(this.lerp);

            this.setX(this.x + (xDisplacement * (-this.recoilDistance * this.lerp)));
            this.setY(this.y + (yDisplacement * (this.recoilDistance * this.lerp)));
            // if (this.x = this.x + (xDisplacement * -this.recoilDistance) && this.y + (yDisplacement * this.recoilDistance)) {
            if (this.lerp <= 0) {
                // this.scene.time.delayedCall(100, () => this.setX(this.oldX));
                // this.scene.time.delayedCall(100, () => this.setY(this.oldY));
                // this.setX(this.oldX);
                // this.setY(this.oldY);

                this.arrievedMaximumDisplacement = true;
                // this.lerp = 2;
                // this.time = 0.3;            
            }
        } else {

            // if (this.time <= 1) {
            //     this.time += 0.01;
            // } else {
            //     // console.log(this.time);

            // }
            this.lerp += Phaser.Math.Linear(0, 1, this.time);


            this.setX(this.x - (xDisplacement * (-this.recoilDistance * this.lerp)));
            this.setY(this.y - (yDisplacement * (this.recoilDistance * this.lerp)));
            // this.setX(this.x + (xDisplacement * (-this.recoilDistance * this.lerp)));
            // this.setY(this.y + (yDisplacement * (this.recoilDistance * this.lerp)));
            // if (this.x = this.x + (xDisplacement * -this.recoilDistance) && this.y + (yDisplacement * this.recoilDistance)) {

            if (this.lerp >= 1.2) {
                // this.scene.time.delayedCall(100, () => this.setX(this.oldX));
                // this.scene.time.delayedCall(100, () => this.setY(this.oldY));
                this.lerp = 1.5;

                this.knockBack = false;
                this.gotInitialPos = false;
                this.arrievedMaximumDisplacement = false;
            }
        }
    }
}