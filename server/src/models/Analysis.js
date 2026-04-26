const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  jobDescription: {
    type: String,
    required: true
  },
  resumeText: {
    type: String,
    required: true
  },
  results: {
    atsScore: Number,
    feedback: String,
    matchedKeywords: [String],
    missingKeywords: [String],
    sectionScores: {
      toneAndStyle: Number,
      contentQuality: Number,
      structure: Number,
      skillsMatch: Number
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
