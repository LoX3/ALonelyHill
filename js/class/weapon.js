/**
 * @class Weapon - Arma del jugador
 *
 * @param {Phaser.Scene} scene Escena donde se pone el arma
 * @param {Number} x Posicion horizontal del contenedor
 * @param {Number} y Posicion vertical del contenedor
 * @param {Phaser.GameObjects.Image} butt Culata del arma
 * @param {Phaser.GameObjects.Image} handle Parte central del arma
 * @param {Phaser.GameObjects.Image} canon Cañon del arma
 * @param {Phaser.GameObjects.Sprite} bulletType Tipo de bala que dispara el arma
 */
class Weapon extends Phaser.GameObjects.Container {
    /**
     * @constructor Constructor del arma del jugador
     * @param {Phaser.Scene} scene
     * @param {Number} x
     * @param {Number} y
     * @param {Phaser.GameObjects.Image} butt
     * @param {Phaser.GameObjects.Image} handle
     * @param {Phaser.GameObjects.Image} canon
     * @param {Phaser.GameObjects.Sprite} bulletType
     */
    constructor(scene, x, y, butt, handle, canon, bulletType) {
        // Se crea el contenedor con la escena y la posición
        super(scene, x, y);
        // Al hacer scale de las partes del arma, no quedan bien, con esto se arregla
        var handleWidth = handle.scale * handle.width;
        var canonWidth = canon.scale * canon.width;
        // Pongo las armas en posición
        butt.x -= (handleWidth / 2);
        canon.x += (handleWidth / 2);

        // Pongo las armas como hijos
        this.addAt(butt, 0);
        this.addAt(handle, 1);
        this.addAt(canon, 2);

        // Creo las variables de la clase
        this.init();
        // Guardo la escena en la que estamos
        this.scene = scene;
        // Pongo valor al tipo de bala
        this.bulletType = bulletType;
        // Offset para que la bala salga del cañon
        this.canonOffset = 12;

        // Creo el grupo para guardar las balas
        this.bulletGroup = scene.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Creo un objeto vacio para que la bala salga y lo pongo como hijo
        var shootPosX = canonWidth + (handleWidth / 2);
        this.shootPos = scene.physics.add.image(shootPosX, -this.canonOffset);
        this.shootPos.setSize(1, 1);
        this.addAt(this.shootPos, 3);

        // Imagen del puntero
        this.puntero = scene.add.image(0, 0, 'scope');
        // Scroll factor sirve para que no se mueva al cambiar la cámara de posicion
        this.puntero.setScrollFactor(0);

        // Al mover el ratón por le juego, roto el arma para que apunte
        scene.input.on('pointermove', this.rotateWeaponTowardsMouseAngle, this);
        // Al hacer click con el ratón, disparo 
        scene.input.on('pointerdown', this.shoot, this);

        // Creo las variables para conseguir posiciones absolutas
        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
        this.tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    }

    /**
     * @function init Init es la primera función que se llama cuando se
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
         * Grupo donde se guardan las balas
         * @type {Phaser.GameObjects.Group}
         * @property {JSON} config Opciones del grupo
         * @property {Bullet} config.classType Define el tipo de clase en el grupo {@link Phaser.GameObjects.Group#classType}.
         * @property {Boolean} config.runChildUpdate Hace que se ejecuten los updates de los elementos dentro del grupo {@link Phaser.GameObjects.Group#runChildUpdate}.
         */
        this.bulletGroup;

        /**
         * @type {String} Tipo de bala que se dispara
         */
        this.bulletType;

        /**
         * @type {Phaser.GameObjects.Image} Final del cañon del arma por donde sale la bala
         */
        this.shootPos;

        /**
         * @type {Number} Offset para que concuerde del final del cañon verticalmente
         */
        this.canonOffset;

        /**
         * @type {Phaser.GameObjects.Components.TransformMatrix} Se utiliza para cojer la posición absoluta de @var this.shootPos
         */
        this.tempMatrix;

        /**
         * @type {Phaser.GameObjects.Components.TransformMatrix} Se utiliza para cojer la posición absoluta de @var this.shootPos
         */
        this.tempParentMatrix;

        /**
         * @type {Number} Obtiene los valores absolutos del punto de salida de la bala
         */
        this.absoluteShootPos = new Phaser.Math.Vector2();
    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.shootPos.getWorldTransformMatrix(this.tempMatrix, this.tempParentMatrix);
        this.absoluteShootPos = this.tempMatrix.decomposeMatrix();

        this.rotateWeaponTowardsMouseAngle(this.scene.input);
    }

    /**
     * @function rotateWeaponTowardsMouseAngle Rota el objeto arma hacia el puntero
     * @param {Phaser.Input.Pointer} pointer Puntero del ratón
     */
    rotateWeaponTowardsMouseAngle(pointer) {
        let cursor = pointer;

        var axisX = this.parentContainer.x + this.x;
        var axisY = this.parentContainer.y + this.y - this.canonOffset;

        let angle = this.getRotationToPointer(axisX, axisY, cursor);

        // Si la rotacion es mas de 1.5 significa que ha de cambiar
        this.setScale(1, (Math.abs(angle) > 1.5) ? -1 : 1);
        this.setRotation(angle);

        this.puntero.x = cursor.x;
        this.puntero.y = cursor.y;
    }

    getRotationToPointer(originX, originY, pointer) {
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(originX, originY, cursor.x + this.scene.cameras.main.scrollX, cursor.y + this.scene.cameras.main.scrollY);

        return angle;
    }

    /**
     * @function shoot Disparo del arma
     * @param {Phaser.Input.Pointer} pointer Puntero del ratón
     */
    shoot(pointer) {
        var shootRotation = this.getRotationToPointer(this.absoluteShootPos.translateX, this.absoluteShootPos.translateY, pointer);

        var bala = new Bullet(this.scene, this.absoluteShootPos.translateX, this.absoluteShootPos.translateY, this.bulletType, shootRotation);
        this.bulletGroup.add(bala);
        bala.body.setSize(7, 7);

        bala.x = this.absoluteShootPos.translateX;
        bala.y = this.absoluteShootPos.translateY;
    }
}