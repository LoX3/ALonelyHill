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
        // var worldStructure = this.generateMatrix(500, 200);
        var worldStructure = this.generateMatrix(50, 50);

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
     * Esta función planta 
     * @param {Number[]} matrixToPopulate La matriz que se va a popular con semillas
     * @param {tileNames} tile Tipo de semilla que se quiere plantar 
     * @param {Number} seedBirthChance La probabilidad que hay de que nazca una semilla (en %)
     * @returns {Number[]} El mapa procesado 
     */
    plantSeeds(matrixToPlant, tile, seedBirthChance) {
        // Lleno el vector con tiles
        for (let height = 0; height < matrixToPlant.length; height++) {
            
            for (let width = 0; width < matrixToPlant[height].length; width++) {
                
                if (height > 0 && width > 0 && height < matrixToPlant.length - 1 && width < matrixToPlant[height].length - 1) {
                    var seed = randomInt(0, 101);
                    
                    if (seed <= seedBirthChance) {
                        matrixToPlant[height][width] = tile;
                    } else {
                        matrixToPlant[height][width] = tileNames.GREEN_GRASS;
                    }
                } else {
                    matrixToPlant[height][width] = tileNames.GREEN_GRASS;
                }
            }
            
        }
        
        return matrixToPlant;
    }
    
    /**
     * Esta funcion se encarga de popular todas las semillas plantadas 
     * teniendo como referencia las semillas de las celdas vecinas. 
     * @param {*} matrixToPopulate Matriz a popular
     * @param {*} repetitions Numero de veces que se procesará el mapa usando el algoritmo
     * @param {*} deathLimit Cantidad de celdas vecinas necesarias para que la semilla sobreviva
     * @returns {Number[]} El mapa procesado 
     */
    populateSeeds(matrix, tileToPopulate, birthLimit, repetitions) {
        var matches = 0;
        var round = 0;
        var matrixToPopulate = matrix;
        var survived = false;
        var neighbourTiles = [];

        for (let r = 0; r < repetitions; r++) {
            // Lleno el vector con tiles
            for (let height = 1; height < matrixToPopulate.length - 1; height++) {
                for (let width = 1; width < matrixToPopulate[height].length - 1; width++) {

                    neighbourTiles = [];
                    matches = 0;
                    round = 0;
                    survived = false;


                    neighbourTiles.push(matrix[height - 1][width - 1]);
                    neighbourTiles.push(matrix[height - 1][width]);
                    neighbourTiles.push(matrix[height - 1][width + 1]);
                    neighbourTiles.push(matrix[height][width - 1]);
                    neighbourTiles.push(matrix[height][width + 1]);
                    neighbourTiles.push(matrix[height + 1][width - 1]);
                    neighbourTiles.push(matrix[height + 1][width]);
                    neighbourTiles.push(matrix[height + 1][width + 1]);

                    while (round < neighbourTiles.length) {
                        // console.log("Comparing(" + round + ") " + neighbourTiles[round] + "  (" + height + "," + width + ") to " + tileToPopulate);

                        if (neighbourTiles[round] == tileToPopulate) {
                            matches++;
                        }

                        if (matches >= birthLimit) {
                            survived = true;
                        }

                        round++;
                    }

                    if (survived) {
                        matrixToPopulate[height][width] = tileToPopulate;
                    }else {
                        matrixToPopulate[height][width] = tileNames.GREEN_GRASS;
                    }

                }

            }
            matrix = matrixToPopulate;
        }

        return matrixToPopulate;
    }

    decorateMap(worldStructure, tileBounds) {
        return worldStructure;
    }

    /**
     * Esta funcion se encarga de generar un mapa dadas unas medidas de altitud y amplitud
     * @param {Number} width 
     * @param {Number} height 
     */
    generate(width, height) {
        // Creo la matriz del mapa
        var worldStructure = this.generateMatrix(width, height);

        worldStructure = this.plantSeeds(worldStructure, tileNames.BROWN_EARTH, 15);

        worldStructure = this.populateSeeds(worldStructure, tileNames.BROWN_EARTH, 3, 5);

        worldStructure = this.decorateMap(worldStructure, tileNames.GRASS_TRANSITION);

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