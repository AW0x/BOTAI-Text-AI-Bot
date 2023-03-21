const { Telegraf } = require("telegraf");

// Bot config
const bot = new Telegraf(process.env.BOT_TOKEN);

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
bot.on("message", async (msg) => {
  let hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    console.log("Received 'hi' command from user ");
    await bot.sendMessage(msg.chat.id, "Hi, user Name");
  }

  let bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    console.log("Received 'bye' command from user ");
    await bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
});

// Reply to user who run command /ask
bot.on(message(/\/ask (.+)/), async (msg, match) => {
  clientMessageRequest = match[1];
  console.log("Received '/ask' command from user ");
  await bot.sendMessage(msg.chat.id, "Hi, anda telah mencoba command /ask");
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
