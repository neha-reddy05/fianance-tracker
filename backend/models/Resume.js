const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  filename: String,
  fileUrl: String,           // future: S3 URL or local path
  uploadedAt: { type: Date, default: Date.now },
  text: String,
  atsScore: Number,
  breakdown: Object,
  suggestions: Array,
  keywordsMatched: [String],
  metadata: Object
});

module.exports = mongoose.model('Resume', ResumeSchema);
