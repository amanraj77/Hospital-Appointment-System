const express = require('express')
const router = express.Router()
const { queryNLPService } = require('../services/nlpService')

router.post('/ask', async (req, res) => {
  try {
    const { symptoms } = req.body
    const result = await queryNLPService(symptoms)
    res.json({ answer: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
