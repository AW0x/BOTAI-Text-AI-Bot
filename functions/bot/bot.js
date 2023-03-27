const { Telegraf } = require("telegraf");
require("dotenv").config();
const { getResponse } = require("../../openai/main");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log("Received /start command");
  try {
    ctx.reply(
      "Hi, I am BOTAI. AI-integrated telegram bot built to help you with your daily life"
    );
    ctx.reply("Please ask anything, BOTAI will response your question.");
    return ctx.reply("Welcome, " + ctx.message.from.username + " to BOTAI bot");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

bot.on("message", async (ctx) => {
  const text = ctx.message.text?.toLowerCase();
  try {
    if (text) {
      ctx.sendChatAction("typing");
      const res = await getResponse(responseToUser);
      if (res) {
        ctx.telegram.sendMessage(ctx.message.chat.id, res, {
          reply_to_message_id: ctx.message.message_id,
        });
      }
    } else {
      ctx.telegram.sendMessage(ctx.message.chat.id, "Please ask anything", {
        reply_to_message_id: ctx.message.message_id,
      });

      //  reply("Please ask anything after /ask");
    }
  } catch (error) {
    return ctx.reply("Error occured");
  }
});

bot.help((ctx) => {
  ctx.reply(
    "BOTAI is AI-integrated telegram bot built to help you with your daily life"
  );
  ctx.reply(
    'This bot was created by Vii. Chat if need anithing at Discord "Xie#5161".'
  );
  ctx.reply("Thanks You, for using BOTAI bot");
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
// exports.handler = async (event) => {
//   try {
//     await bot.handleUpdate(JSON.parse(event.body));
//     return { statusCode: 200, body: "" };
//   } catch (e) {
//     console.error("error in handler:", e);
//     return {
//       statusCode: 400,
//       body: "This endpoint is meant for bot and telegram communication",
//     };
//   }
// };

bot
  .launch()
  .then(() => {
    console.log("Bot started!");
  })
  .catch((err) => {
    console.log(err);
  });
