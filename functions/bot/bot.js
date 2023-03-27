const { Telegraf } = require("telegraf");
require("dotenv").config();
const { getResponse } = require("../../openai/main");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log("Received /start command");
  try {
    return ctx.reply("Welcome, " + ctx.message.from.username + " to BOTAI");
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
      const res = await getResponse(text);
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

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};

bot
  .launch()
  .then(() => {
    console.log("Bot started!");
  })
  .catch((err) => {
    console.log(err);
  });
