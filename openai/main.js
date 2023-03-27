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

const getResponse = async (text) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 1000,
      frequency_penalty: 0.2,
      presence_penalty: 0,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateChatResponse, getResponse };
