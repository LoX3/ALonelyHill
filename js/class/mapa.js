/**
 * @author Jose Luis Tresserras
 * @class Clase para establecer los parametros de los mapas
 * @param {Number} index 
 * @param {String} nombre
 * @param {Number[]} mapas
 */
class Mapa {
    /**
     * Mapas para jugar al juego
     * @constructor
     * @param {Number} index Indice del mapa
     * @param {String} nombre Nombre del mapa
     * @param {Number[]} mapa CSV del mapa 
     */
    constructor(index, nombre, mapa) {
        // Creo las variables de la clase
        this.init();

        // Inicializo las variables
        this.index = index;
        this.nombre = nombre;
        this.mapa = mapa;
    }

    init() {
        /**
         * Indice del mapa
         * @type {Number}
         */
        this.index;

        /**
         * Nombre del mapa
         * @type {String}
         */
        this.nombre;

        /**
         * CSV del mapa 
         * @type {Number[]}
         */
        this.mapa;
    }

    /**
     * Devuelve el indice del atributo
     * @returns {number} Devuelve el indice del atributo
     */
    getIndex() {
        return this.index;
    }

    /**
     * Devuelve el nombre del atributo
     * @returns {number} Devuelve el nombre del atributo
     */
    getNombre() {
        return this.nombre;
    }

    /**
     * Devuelve el mapa del atributo
     * @returns {number} Devuelve el mapa del atributo
     */
    getMapa() {
        return this.mapa;
    }
}