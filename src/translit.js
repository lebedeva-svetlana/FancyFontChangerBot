'use strict';

function isUpper(index, text) {
    let indexIsUpper = false;
    if (text[index] !== undefined) {
        if (text[index] !== text[index].toLowerCase()) {
            indexIsUpper = true;
        }
    }
    return indexIsUpper;
}

module.exports.translit = function (text) {
    let translitDict = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sch',
        'ь': '',
        'ы': 'y',
        'ъ': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
    };

    let translit_text = '';
    for (let i = 0; i < text.length; ++i) {
        let dict_letter = translitDict[text[i].toLowerCase()];

        if (dict_letter === undefined) {
            translit_text += text[i];
            continue;
        }

        if (text[i] === text[i].toLowerCase()) {
            translit_text += dict_letter;
            continue;
        }

        let nextIsUpper = isUpper(i + 1, text);
        let previousIsUpper = isUpper(i - 1, text);

        if (dict_letter.length == 1 || nextIsUpper || previousIsUpper) {
            dict_letter = dict_letter.toUpperCase();
        }
        else {
            dict_letter = dict_letter.charAt(0).toUpperCase() + dict_letter.slice(1);
        }

        translit_text += dict_letter;
    }

    return translit_text;
}