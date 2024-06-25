const express = require('express');
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const configuration = new Configuration({
    apiKey: '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',
  });

const openai = new OpenAIApi(configuration);

router.post('/uploadFile/:id', upload.single('file'), async (req, res) => {
  const workId = req.params.id;
  const description = req.body.description;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  try {
    // Read the file content
    const filePath = path.join(__dirname, '../uploads', file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Combine description and file content for AI analysis
    const prompt = `Description: ${description}\n\nDocument Content: ${fileContent}`;

    // Generate a response from OpenAI
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.data.choices[0].text.trim();

    // Determine if the work is related to the description
    const isRelated = aiResponse.includes('yes'); // This is a simple check, adjust based on your AI response

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: isRelated
        ? 'The work is related to the description.'
        : 'The work is not related to the description.',
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ success: false, error: 'Error processing file' });
  }
});

module.exports = router;
