const pdfParse = require('pdf-parse');
const { analyzeResumeWithGemini, rewriteBulletWithGemini } = require('../utils/geminiClient');
const Analysis = require('../models/Analysis');

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a PDF resume.' });
    }
    
    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim() === '') {
      return res.status(400).json({ error: 'Please provide a job description.' });
    }

    let resumeText = '';
    try {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
    } catch (parseError) {
      return res.status(400).json({ error: `Could not extract text from the provided PDF. Reason: ${parseError.message || parseError}` });
    }

    if (!resumeText || resumeText.trim() === '') {
      return res.status(400).json({ error: 'The uploaded PDF appears to be empty or unreadable.' });
    }

    const analysisResult = await analyzeResumeWithGemini(resumeText, jobDescription);

    // Save to database if user is authenticated
    if (req.user) {
      await Analysis.create({
        user: req.user._id,
        jobDescription,
        resumeText,
        results: analysisResult
      });
    }

    return res.status(200).json({
      success: true,
      data: analysisResult
    });

  } catch (error) {
    console.error('Analyze Controller Error:', error);
    return res.status(500).json({ error: 'An error occurred while analyzing the resume.', details: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

const rewriteBullet = async (req, res) => {
  try {
    const { bulletText, jobDescription } = req.body;
    if (!bulletText || !jobDescription) {
      return res.status(400).json({ error: 'Please provide both bullet point and job description' });
    }
    const result = await rewriteBulletWithGemini(bulletText, jobDescription);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to rewrite bullet' });
  }
};

module.exports = {
  analyzeResume,
  getHistory,
  rewriteBullet
};
