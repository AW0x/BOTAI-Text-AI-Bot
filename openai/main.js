const { OpenAIApi } = require("openai");
const openai_config = require("./openai.config");

const openai = new OpenAIApi(openai_config);

async function generateChatResponse(message, user) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a telegram chatbot named 'BOTAI'.",
      },
      { role: "user", content: message },
    ],
    max_tokens: 512,
    user,
  });
  return completion.data.choices[0].message.content;
}

const getImage = async (text) => {
  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    });

    return response.data.data[0].url;
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (text) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 1000,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateChatResponse, getImage, getChat };
