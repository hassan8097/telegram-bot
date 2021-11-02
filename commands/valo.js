const { Composer } = require("telegraf");

const composer = new Composer();

composer.command("composer", (ctx) => ctx.reply("nice work"));

module.exports = composer;
