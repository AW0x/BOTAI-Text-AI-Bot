// require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { getImage, getChat } = require("./functions");
const { Telegraf } = require("telegraf");

// Bot config
const bot = new Telegraf(process.env.BOT_TOKEN);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);
module.exports = openai;

// BOT START ==========================
// Reply to user who run command /start
bot.start((ctx) => {
  console.log("Received /start command from user ");
  try {
    return ctx.reply("Welcome, " + ctx.message.from.username + " to BOTAI");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

// Reply to user who run command "hi"
// bot.command("hi", async (ctx) => {
//   if (ctx.text.toString().toLowerCase().indexOf(ctx) === 0) {
//     console.log("Received 'hi' command from user ");
//     return await ctx.reply(ctx.chat.id, "Hi, user Name");
//   }
// });

// // Reply to user who run command "bye"
// bot.command("bye", async (ctx) => {
//   if (ctx.text.toString().toLowerCase().includes(ctx)) {
//     console.log("Received 'bye' command from user ");
//     return await ctx.reply(ctx.chat.id, "Hope to see you around again , Bye");
//   }
// });

// Reply to user who run command /ask
bot.command("ask", async (ctx) => {
  const text = ctx.message.text?.replace("/ask", "")?.trim().toLowerCase();

  if (text) {
    ctx.sendChatAction("typing");
    const res = await getChat(text);
    if (res) {
      ctx.telegram.sendMessage(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Please ask anything after /ask",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );

    //  reply("Please ask anything after /ask");
  }
});

// Reply to user who run command /image
bot.command("image", async (ctx) => {
  const text = ctx.message.text?.replace("/image", "")?.trim().toLowerCase();

  if (text) {
    const res = await getImage(text);

    if (res) {
      ctx.sendChatAction("upload_photo");
      // ctx.sendPhoto(res);
      // ctx.telegram.sendPhoto()
      ctx.telegram.sendPhoto(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "You have to give some description after /image",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  }
});

bot.help((ctx) => {
  ctx.reply(
    "This bot can perform the following command \n /image -> to create image from text \n /ask -> ank anything from me "
  );
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
export const handler = async (event) => {
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

bot.launch();
