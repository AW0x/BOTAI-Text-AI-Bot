const express = require("express");
const expressApp = express();
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf("6043963401:AAHBL-H9afpohGbMb9i6d7JQPicln4ZJg-o");
// const bot = new Telegraf(process.env.BOT_TOKEN);

expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.command("ethereum", (ctx) => {
  var rate;
  console.log(ctx.from);
  axios
    .get(
      `   https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
    .then((response) => {
      console.log(response.data);
      rate = response.data.ethereum;
      const message = `Hello, today the ethereum price is ${rate.usd}USD`;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});

bot.launch();

// const TelegramBot = require("node-telegram-bot-api");

// // const token = process.env["BOT_TOKEN"];
// const token = "6043963401:AAHBL-H9afpohGbMb9i6d7JQPicln4ZJg-o";

// const bot = new TelegramBot(token, { polling: true });

/*  Referensi
    https://github.com/yagop/node-telegram-bot-api
    https://github.com/hosein2398/node-telegram-bot-api-tutorial

    # Kumpulan Daftar Command Telegram Bot
*/

// bot.on("message", (msg) => {
//   var Hi = "hi";
//   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     bot.sendMessage(msg.chat.id, "Hello dear user");
//   }
// });

// bot.on("message", (msg) => {
//   var aboutMe = "me";
//   if (msg.text.toString().toLowerCase().indexOf(aboutMe) === 0) {
//     bot.sendMessage(
//       msg.chat.id,
//       "I am BOTAI. I am a bot created to help you complete your daily tasks."
//     );
//     bot.sendMessage(msg.chat.id, "This bot was created by Vii.");
//   }
// });

// bot.launch();
