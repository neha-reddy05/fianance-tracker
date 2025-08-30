// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();

const upload = require('../utils/fileUpload'); // ✅ corrected import
const { uploadAndAnalyze, getResume, getUserResumes } = require('../controllers/resumeController');
const { authMiddleware } = require('../middleware/auth');

// Upload & analyze resume (public for now; can add authMiddleware if you want)
router.post('/upload', upload.single('resume'), uploadAndAnalyze);

// Get resume by ID
router.get('/:id', getResume);

// Get user’s resume history (protected)
router.get('/user/history', authMiddleware, getUserResumes);

module.exports = router;
