const axios = require("axios");
const { Markup, Telegraf } = require("telegraf");
const bot = new Telegraf("2038911438:AAHchz_TSG9A9XL_hUbzAVfmO_GJQyiVp4E");

const BUDDHA_ID =
  "CAACAgUAAxkBAANRYYFArEgwkEzA8LEPE8i27uu43AUAAs4AA7ztLSAkgdkbUXnD8SEE";

bot.command("check", (ctx) => {
  // reply "even" if number is even, esle reply with a emoji
  // example -> /check 1
  const num = ctx.message.text.split("/check ")[1];

  num % 2 == 0 ? ctx.reply("Even ") : ctx.replyWithSticker(BUDDHA_ID);
});

bot.hears("buddha", (ctx) => {
  ctx.replyWithSticker(BUDDHA_ID);
});

bot.command("git", (ctx) => {
  const username = ctx.message.text.split("/git ")[1];

  axios.get("https://api.github.com/users/" + username).then(({ data }) => {
    let string = "";

    string += `Name: ${data.name}\n`;
    string += `Company: ${data.company}\n`;
    string += `Followers: ${data.followers}\n`;

    ctx.replyWithPhoto(
      { url: data.avatar_url },
      {
        caption: string,
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.url("Github", "https://github.com"),
            Markup.button.url("Google", "https://github.com"),
          ],

          [
            Markup.button.url("Facebook", "https://github.com"),
            Markup.button.url("Twitter", "https://github.com"),
          ],
        ]).reply_markup,
      }
    );
  });
});

const stickers = [
  "CAACAgIAAxkBAAOeYYFLYoC4NoLYt37BrMqSlJcY0HAAAgILAAKnlQFKRmIUsnZhSlAhBA",
  "CAACAgIAAxkBAAOfYYFLYlxFqIi4_d1YZPn2Hk2Bq0YAAm4MAAK__PlJQ7vLsI9TuYshBA",
  "CAACAgIAAxkBAAOgYYFLY2X_tWISUTbzU7cuBcvNf54AAkoLAAJqdAFK0rnhRIy7tdQhBA",
  "CAACAgIAAxkBAAOhYYFLY5g-3Erh5MqD7YKR1vxSKqoAAmMNAAI9WAFKukXnBULBC14hBA",
  "CAACAgIAAxkBAAOiYYFLYzd5rDW2xcxqJMEtq5IrCx4AAl4MAAKs8vlJNxjqHasHvakhBA",
  "CAACAgIAAxkBAAOjYYFLZAERWIEbMmhT8X2IIJ57dNcAAmYMAALuswABSohZ1LzfIGxyIQQ",
  "CAACAgIAAxkBAAOkYYFLZZKg4NzOP_S22Wzo6e1MDbAAAmwKAAKaI_lJ6LFfLscxN2UhBA",
];

bot.command("valo", (ctx) => {
  const length = stickers.length;
  const random = Math.floor(Math.random() * length - 1);
  ctx.replyWithSticker(stickers[random]);
});

bot.command("annoy", (ctx) => {
  const username = "@xencodes";

  new Array(15).fill(null).map(async () => {
    const { message_id } = await ctx.reply(username);
    setTimeout(() => ctx.deleteMessage(message_id), 100);
  });
});
bot.launch();
