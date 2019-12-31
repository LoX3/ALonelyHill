// /**
//  * @type {import("../../typings/phaser")}
//  */

/**
 * @author Jose Luis Tresserras
 * @class Clase para usar y crear y guardar los mapas
 */
class MapManager {

    /**
     * Gestor de mapas
     * @constructor
     */
    constructor() {
        this.world;
        this.titleBackground;
    }

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
        var worldStructure = this.generateMatrix(500, 200);
        for (let i = 0; i < worldStructure.length; i++) {
            for (let j = 0; j < worldStructure[i].length; j++) {
                worldStructure[i][j] = 50;
            }
        }
        var newMap = new Map(
            0,
            "map_world",
            worldStructure
        )
        this.world = newMap;
    }
    generateBackground() {
        var worldStructure = this.generateMatrix(500, 200);
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
                    } else{
                        worldStructure[i][j] = tiles.BROWN_EARTH;
                    }
                } else {
                    worldStructure[i][j] = tiles.GREEN_GRASS;
                }
            }
        }
        var newMap = new Map(
            0,
            "map_background",
            worldStructure
        )
        this.titleBackground = newMap;
    }

    getWorld() {
        return this.world;
    }
    getTitleBackground() {
        return this.titleBackground;
    }
}