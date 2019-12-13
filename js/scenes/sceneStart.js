/**
 * @type {import("typings/phaser.d.ts")}
 */

/**
 * @class Escena principal, donde puedes empezar partida
 */
class SceneStart extends Phaser.Scene {

    /**
     * Escena principal del juego
     * @constructor
     */
    constructor() {
        super({
            key: 'start'
        });
    }
}