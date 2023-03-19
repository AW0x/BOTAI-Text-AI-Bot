const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

/*  Referensi
    https://github.com/yagop/node-telegram-bot-api
    https://github.com/hosein2398/node-telegram-bot-api-tutorial

    # Kumpulan Daftar Command Telegram Bot
*/

bot.on("message", (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, "Hello dear user");
  }
});

bot.on("message", (msg) => {
  var aboutMe = "me";
  if (msg.text.toString().toLowerCase().indexOf(aboutMe) === 0) {
    bot.sendMessage(
      msg.chat.id,
      "I am BOTAI. I am a bot created to help you complete your daily tasks."
    );
    bot.sendMessage(msg.chat.id, "This bot was created by Vii.");
  }
});
