/**
 * Nombre de las imágenes de las armas
 * @enum {Number}
 * @name gameStates 
 * @property {Number} PRELOAD Cargando los assets del juego
 * @property {Number} LOADING Esperando la carga de alguna cosa
 * @property {Number} MENU Estando en el menu del juego
 * @property {Number} PAUSE Estando con el juego pausado
 * @property {Number} PLAYING Escena del juego principal
 * @property {Number} CHOOSEWEAPON Escena para escojer arma del jugador
 */
const gameStates = {
    PRELOAD: 0,
    LOADING: 1,
    MENU: 2,
    PAUSE: 3,
    PLAYING: 4
}