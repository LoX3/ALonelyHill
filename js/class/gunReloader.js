/**
 * Esta clase se usa para crear el tipo de cargador que usa un arma
 * @class 
 * @param {Number} tamañoCargador
 * @param {Number} balasTotales
 */
class GunReloader {
    /**
     * Constructor de la escena GunReloader
     * @constructor 
     * @param {Number} tamañoCargador Capacidad maxima de un cargador
     * @param {Number} balasTotales Total de balas con las que cuenta el jugador
     */
    constructor(tamañoCargador, balasTotales) {
        this.init();

        // Creo el cargador y le asigno las balas
        this.maxCapacity = tamañoCargador;
        this.currentBullets = this.maxCapacity;

        // Establezco las balas totales del jugador
        this.totalBullets = balasTotales;
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
         * Balas restantes en el cargador
         * @type {Number}
         */
        this.currentBullets;

        /**
         * Capacidad maxima de un cargador
         * @type {Number}
         */
        this.maxCapacity;

        /**
         * Total de balas con las que cuenta el jugador
         * @type {Number}
         */
        this.totalBullets;
    }

    /**
     * Mira si le quedan balas al cargador
     * @returns {Boolean}
     */
    canShoot() {
        var retVal = false;

        if (this.currentBullets > 0) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Dispara una bala
     */
    shoot() {
        if (this.canShoot()) {
            this.currentBullets--;
        }
        else {
            console.log('U need to reload!');
        }
    }

    /**
     * Recarga las balas del cargador
     */
    reload() {
        var difBullets = this.currentBullets - this.maxCapacity;

        this.totalBullets -= Math.abs(difBullets);

        if (this.totalBullets - this.maxCapacity > 0) {
            this.currentBullets = this.maxCapacity;
        }
        else {
            this.currentBullets = this.totalBullets;
        }
    }

    isFull() {
        var retVal = false;

        if (this.currentBullets == this.maxCapacity) {
            retVal = true;
        }

        return retVal;
    }
}