'use strict';

const { RUSSIAN, ENGLISH, FONTS_RUSSIAN, FONTS_ENGLISH, PANGRAM_RUSSIAN, PANGRAM_ENGLISH } = require('./text.js');
const { changeFont } = require('./changeFont.js');

module.exports.getAllCommandText = function () {
    let message = 'Команды выбора шрифта:\n\n';
    for (let i = 0; i < FONTS_RUSSIAN.length; ++i) {
        message += `/russian${i + 1} — ${changeFont(PANGRAM_RUSSIAN, FONTS_RUSSIAN[i], RUSSIAN)}\n`;
    }
    message += '\n';
    for (let i = 0; i < FONTS_ENGLISH.length; ++i) {
        message += `/english${i + 1} — ${changeFont(PANGRAM_ENGLISH, FONTS_ENGLISH[i], ENGLISH)}\n`;
    }
    return message;
}