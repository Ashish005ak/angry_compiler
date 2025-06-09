const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Store key in .env

async function transformErrorWithAI(rawError) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fast + cheap
    const prompt = `Make this C compiler error sound angry, short, and sarcastic:\n\n${rawError}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    return `AI error: ${err.message}`;
  }
}

module.exports = { transformErrorWithAI };
