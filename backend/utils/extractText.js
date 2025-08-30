// utils/extractText.js
const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extracts text content from uploaded resume file
 * Supports: PDF, DOCX, TXT
 */
async function extractText(file) {
  let text = "";

  if (!file) {
    throw new Error("No file provided for text extraction");
  }

  // Handle PDF
  if (file.mimetype === "application/pdf") {
    const data = await pdf(fs.readFileSync(file.path));
    text = data.text || "";
  }
  // Handle DOCX (Word)
  else if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.originalname.toLowerCase().endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ path: file.path });
    text = result.value || "";
  }
  // Handle TXT or fallback
  else {
    text = fs.readFileSync(file.path, "utf8");
  }

  return text;
}

module.exports = extractText;
