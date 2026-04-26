const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResume, getHistory, rewriteBullet } = require('../controllers/analyzeController');
const { protect } = require('../middleware/authMiddleware');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
// Only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Enforce login for all analyze routes
router.use(protect);

// POST /api/analyze
// Expects form-data: 'resume' (file) and 'jobDescription' (text)
router.post('/', upload.single('resume'), analyzeResume);

// GET /api/analyze/history
router.get('/history', getHistory);

// POST /api/analyze/rewrite
router.post('/rewrite', rewriteBullet);

module.exports = router;
