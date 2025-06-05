const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

// Load your Gemini API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const queryNLPService = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `The user has the following symptoms: ${query}. Provide a possible medical condition and advice.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Error querying Gemini API:', error)
    throw new Error('Failed to get response from Gemini')
  }
}

module.exports = { queryNLPService }
