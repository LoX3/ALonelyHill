/**
 * @author Jose Luis Tresserras
 * @class Clase para establecer los parametros de los mapas
 * @param {Number} index 
 * @param {String} name
 * @param {Number[]} mapas
 */
class Map {
    /**
     * Mapas para jugar al juego
     * @constructor
     * @param {Number} index Indice del mapa
     * @param {String} name Nombre del mapa
     * @param {Number[]} mapa CSV del mapa 
     */
    constructor(index, name, map) {
        // Creo las variables de la clase
        this.init();

        // Inicializo las variables
        this.index = index;
        this.name = name;
        this.map = map;
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
        this.name;

        /**
         * CSV del mapa 
         * @type {Number[]}
         */
        this.map;
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
    getName() {
        return this.name;
    }

    /**
     * Devuelve el mapa del atributo
     * @returns {number} Devuelve el mapa del atributo
     */
    getMap() {
        return this.map;
    }
}