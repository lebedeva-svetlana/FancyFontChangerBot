'use strict';

module.exports.changeFont = function (text, font, alphabet) {
    let changedText = '';

    for (let i = 0; i < text.length; ++i) {
        if (!alphabet.includes(text[i].toLowerCase())) {
            changedText += text[i];
            continue;
        }

        let isLower = text[i] === text[i].toLowerCase();

        for (let j = 0; j < alphabet.length; ++j) {
            if (text[i].toLowerCase() !== alphabet[j]) {
                continue;
            }

            if (isLower) {
                changedText += font.lowercase[j];
                continue;
            }

            if ('uppercase' in font) {
                changedText += font.uppercase[j];
            } else {
                changedText += font.lowercase[j];
            }
        }
    }

    return Buffer.from(changedText, 'utf8').toString();
}