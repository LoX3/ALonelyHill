/**
 * Nombre de las imágenes de las armas
 * @enum {String}
 * @name sceneNames 
 * @property {String} PRELOAD Escena que carga todos los assets
 * @property {String} MENU Escena al empezar el juego
 * @property {String} SETUP Escena donde se escoje personaje, arma y nombre
 * @property {String} GAME Escena donde se ejecuta el juego
 * @property {String} GAMEUI Interfaz del usuario
 */
const sceneNames = {
    PRELOAD: "scenePreload",
    MENU: "sceneMenu",
    SETUP: 'sceneSetUp',
    GAME: "sceneStart",
    GAMEUI: 'sceneGameUI',
    GAMEOVER: 'sceneGameOver',
}