const { checkSymptoms } = require('../controllers/symptomController')
const { queryNLPService } = require('../services/nlpService')

const symptomRoutes = (app) => {
  // Existing route
  app.post('/api/symptoms/check', checkSymptoms)

  // New Gemini AI route
  app.post('/api/ask', async (req, res) => {
    try {
      const { symptoms } = req.body
      const result = await queryNLPService(symptoms)
      res.json({ answer: result })
    } catch (err) {
      console.error('Gemini Error:', err)
      res.status(500).json({ error: err.message })
    }
  })
}

module.exports = symptomRoutes

