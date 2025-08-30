const fs = require("fs");
const Resume = require("../models/Resume");
const extractText = require("../utils/extractText");
const { computeATSScore } = require("../services/atsScorer");
const { analyzeWithGemini } = require("../services/geminiClient");

// POST /api/resumes/upload
async function uploadAndAnalyze(req, res, next) {
  try {
    const file = req.file;
    const jobDesc = req.body.jobDesc || "";
    const jobKeywords = req.body.jobKeywords ? JSON.parse(req.body.jobKeywords) : [];

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Extract resume text (delegated to utils/extractText.js)
    const text = await extractText(file);

    // ✅ Deterministic ATS scoring
    const det = computeATSScore(text, jobKeywords);

    // ✅ Gemini AI analysis (optional, if key exists)
    const gem = await analyzeWithGemini(process.env.GEMINI_API_KEY, text, jobDesc);

    // ✅ Merge scores (weighted average)
    const gemScore = gem.ats_score_estimate ?? det.score;
    const finalScore = Math.round(0.6 * det.score + 0.4 * gemScore);

    // ✅ Save to DB
    const resumeDoc = await Resume.create({
      userId: req.user ? req.user._id : undefined,
      filename: file.originalname,
      fileUrl: file.path, // 🔜 replace with S3 URL later
      text,
      atsScore: finalScore,
      breakdown: det.breakdown,
      suggestions: gem.issues || gem.recommendations || [],
      keywordsMatched: det.matchedKeywords || [],
      metadata: {
        wordsCount: det.words,
        sections: det.foundSections,
        contactFound: det.emailFound || det.phoneFound || false,
      },
    });

    // ✅ Response back to frontend
    res.json({
      id: resumeDoc._id,
      finalScore,
      breakdown: det.breakdown,
      suggestions: resumeDoc.suggestions,
      keywordsMatched: resumeDoc.keywordsMatched,
      gemini: gem,
    });

    // ❗ Optional: If storing locally, delete file after upload
    // fs.unlinkSync(file.path);
  } catch (err) {
    next(err);
  }
}

// GET /api/resumes/:id
async function getResume(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Resume.findById(id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

// GET /api/resumes/user/history
async function getUserResumes(req, res, next) {
  try {
    const userId = req.user._id;
    const list = await Resume.find({ userId }).sort({ uploadedAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadAndAnalyze, getResume, getUserResumes };
