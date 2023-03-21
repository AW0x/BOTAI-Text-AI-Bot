const { Telegraf } = require("telegraf");

// Bot config
const token = "6043963401:AAHBL-H9afpohGbMb9i6d7JQPicln4ZJg-o";
const bot = new Telegraf(token, { polling: true });

let clientMessageRequest;

// Reply to user who run command /start
bot.start((ctx) => {
  console.log("Received /start command from user ");
  try {
    return ctx.reply("Welcome, " + ctx.message.chat.id + " to BOTAI");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

// Reply to user who run command "hi"
bot.on("message", (msg) => {
  let hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    console.log("Received 'hi' command from user ");
    bot.sendMessage(msg.chat.id, "Hi, user Name");
  }

  let bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    console.log("Received 'bye' command from user ");
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
});

// Reply to user who run command /ask
bot.onText(/\/ask (.+)/, (msg, match) => {
  clientMessageRequest = match[1];
  console.log("Received '/ask' command from user ");
  bot.sendMessage(msg.chat.id, "Hi, anda telah mencoba command /ask");
});
