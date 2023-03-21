const TelegramBot = require("node-telegram-bot-api");
const ogs = require("open-graph-scraper");

// Bot config
const token = "6043963401:AAHBL-H9afpohGbMb9i6d7JQPicln4ZJg-o";
const bot = new TelegramBot(token, { polling: true });

let clientMessageRequest;

bot.on("message", (msg) => {
  let hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(msg.chat.id, "Hi, user Name");
  }

  let bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
});

// Reply to /ask
bot.onText(/\/ask (.+)/, (msg, match) => {
  clientMessageRequest = match[1];
  bot.sendMessage(msg.chat.id, "Hi, anda telah mencoba command /ask");
});
