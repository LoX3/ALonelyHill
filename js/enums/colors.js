/**
 * Colores del juego
 * @enum {Number}
 * @name colors 
 * @property {JSON} number Color en numero Ej. 0xffffff
 * @property {Number} white Color white
 * @property {Number} black Color black
 * @property {Number} red Color red
 * @property {Number} yellow Color yellow
 * @property {Number} orange Color orange
 * @property {Number} green Color green
 * @property {JSON} rgb Color en RGB Ej. rgb(255,255,255)
 * @property {String} white Color white
 * @property {String} black Color black
 * @property {String} red Color red
 * @property {String} yellow Color yellow
 * @property {String} orange Color orange
 * @property {String} green Color green
 * @property {JSON} hex Color hexadecimal Ej. #ffffff
 * @property {String} white Color white
 * @property {String} black Color black
 * @property {String} red Color red
 * @property {String} yellow Color yellow
 * @property {String} orange Color orange
 * @property {String} green Color green
 */
const colors = {
    number: {
        white: 0xffffff,
        black: 0x000000,
        red: 0xff0000,
        yellow: 0xFFFF00,
        orange: 0xFFA500,
        green: 0x114411,
    },
    rgb: {
        white: 'rgb(255,255,255)',
        black: 'rgb(0,0,0)',
        red: 'rgb(255,0,0)',
        yellow: 'rgb(255,255,0)',
        orange: 'rgb(255,165,0)',
        green: 'rgb(17,68,17)',
    },
    hex: {
        white: '#ffffff',
        black: '#000000',
        red: '#ff0000',
        yellow: '#ffff00',
        orange: '#ffa500',
        green: '#114411',
    }
};