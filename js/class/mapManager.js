/**
 * @class Clase para usar y crear y guardar los mapas
 */
class MapManager {

    /**
     * Gestor de mapas
     * @constructor
     */
    constructor() {
        this.init();
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
         * Guarda el mapa del mundo
         * @type {Map}
         */
        this.world;

        /**
         * Fondo del mapa
         * @type {Map}
         */
        this.titleBackground;
    }

    /**
     *  Creo una matriz  para colocar el mapa
     * @param {Number} width Ancho de la matriz
     * @param {Number} height Altura de la matriz
     */
    generateMatrix(width, height) {
        var matrix = [];

        for (var i = 0; i < height; i++) {
            matrix[i] = new Array(width);
        }

        return matrix;
    }

    /**
     * Creo un array con todos los mapas que tenemos, asi poder tenerlos guardados de forma mas eficiente i simple
     * @param {number} nLvl Indice del mapa buscado
     * @returns {Mapa} Mapa con el indice buscado. Si no se encuentra, se devuelve el primero
     */
    generateWorld() {
        // Creo el vector
        var worldStructure = this.generateMatrix(500, 200);

        // Lleno el vector con imagenes
        for (let i = 0; i < worldStructure.length; i++) {
            for (let j = 0; j < worldStructure[i].length; j++) {
                worldStructure[i][j] = 50;
            }
        }

        // Creo el mapa con los tiles
        var newMap = new Map(
            0,
            "map_world",
            worldStructure
        );

        // Guardo el mapa creado
        this.world = newMap;
    }

    /**
     * Genera el fondo con los tiles
     */
    generateBackground() {
        // Creo la matriz del mapa
        var worldStructure = this.generateMatrix(500, 200);

        // Lleno el vector con imagenes
        for (let i = 0; i < worldStructure.length; i++) {
            for (let j = 0; j < worldStructure[i].length; j++) {
                var seed = randomInt(0, 101);
                if (seed > 75) {
                    if (i > 0 && j > 0 && j < worldStructure[i].length - 1 && i < worldStructure.length - 1) {
                        if (worldStructure[i][j - 1] = tiles.BROWN_EARTH) {
                            worldStructure[i][j] = tiles.BROWN_EARTH;
                        } else if (worldStructure[i - 1][j] = tiles.BROWN_EARTH) {
                            worldStructure[i][j] = tiles.BROWN_EARTH;
                        }
                    } else {
                        worldStructure[i][j] = tiles.BROWN_EARTH;
                    }
                } else {
                    worldStructure[i][j] = tiles.GREEN_GRASS;
                }
            }
        }

        // Creo el mapa con los tiles
        var newMap = new Map(
            0,
            "map_background",
            worldStructure
        );

        // Guardo el mapa de fondo
        this.titleBackground = newMap;
    }

    /**
     * Obtengo el mapa actual
     * @returns {Map} El mundo actual
     */
    getWorld() {
        return this.world;
    }

    /**
     * Obtengo los tiles del fondo
     * @returns {Map} El fondo actual
     */
    getTitleBackground() {
        return this.titleBackground;
    }
}