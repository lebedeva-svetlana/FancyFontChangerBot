'use strict';

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const { RUSSIAN, ENGLISH, FONTS_RUSSIAN, FONTS_ENGLISH, PANGRAM_RUSSIAN, PANGRAM_ENGLISH } = require('./text.js');
const { changeFont } = require('./changeFont.js');
const { translit } = require('./translit.js');
const { getAllCommandText } = require("./getAllCommandText");

let BOT_TOKEN = ''; // Insert your bot token

const bot = new Telegraf(BOT_TOKEN);

let font = FONTS_RUSSIAN[0];
let alphabet = RUSSIAN;

const regexRussian = new RegExp(`^/russian[1-${FONTS_RUSSIAN.length}]$`);
const regexEnglish = new RegExp(`^/english[1-${FONTS_ENGLISH.length}]$`);

bot.catch((err) => {
    console.log(err);
});

bot.start(async (ctx) => {
    let name = ctx.message.from.username || ctx.message.from.id;
    await ctx.replyWithHTML(`Здравствуйте, ${name}. Отправьте текст для преобразования.`);
});

bot.command('help', async (ctx) => {
    await ctx.reply(getAllCommandText());
});

bot.hears(regexRussian, async (ctx) => {
    alphabet = RUSSIAN;
    font = FONTS_RUSSIAN[ctx.message.text.slice(8, 9) - 1];
    await ctx.reply(`Шрифт успешно изменён. Пример текста:\n\n${changeFont(PANGRAM_RUSSIAN, font, alphabet)}`);
});

bot.hears(regexEnglish, async (ctx) => {
    alphabet = ENGLISH;
    font = FONTS_ENGLISH[ctx.message.text.slice(8, 9) - 1];
    await ctx.reply(`Шрифт успешно изменён. Пример текста:\n\n${changeFont(PANGRAM_ENGLISH, font, alphabet)}`);
});

bot.on(message('text'), async (ctx) => {
    let message = ctx.message.text;
    if (alphabet == ENGLISH) {
        message = translit(ctx.message.text);
    }
    await ctx.replyWithHTML(`Нажмите на текст, чтобы скопировать его.\n\n<code>${changeFont(message, font, alphabet)}</code>`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));