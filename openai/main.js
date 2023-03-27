const { OpenAIApi } = require("openai");
const openai_config = require("./openai.config");

const openai = new OpenAIApi(openai_config);

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

module.exports = { getResponse };
