/**
 * Nombre de las imágenes de las armas
 * @enum {Number}
 * @name tileNames 
 * @property {Number} GREEN_GRASS Suelo verde
 * @property {Number} BROWN_EARTH Suelo marrón
 * @property {JSON} GRASS_TRANSITION Diferentes tipos de suelo
 * @property {Number} TOP_LEFT_CORNER Suelo arriba a la izquierda
 * @property {Number} TOP_RIGHT_CORNER Suelo arriba a la derecha
 * @property {Number} TOP Suelo arriba
 * @property {Number} BOTTOM_LEFT_CORNER Suelo abajo a la izquierda
 * @property {Number} BOTTOM_RIGHT_CORNER Suelo abajo a la derecha
 * @property {Number} BOTTOM Suelo abajo
 * @property {Number} LEFT Suelo izquierda
 * @property {Number} RIGHT Suelo derecha
 */
const tileNames = {
    GREEN_GRASS: 560,
    BROWN_EARTH: 546,
    GRASS_EARTH_TRANSITION: {
        TOP_LEFT_CORNER: 513,
        TOP_RIGHT_CORNER: 515,
        TOP: 514,
        BOTTOM_LEFT_CORNER: 577,
        BOTTOM_RIGHT_CORNER: 579,
        BOTTOM: 578,
        LEFT: 545,
        RIGHT: 547,
    },
    GRAY_ROCK: 192
}