// Deterministic ATS scoring logic - tweak as needed
function computeATSScore(text = '', jobKeywords = []) {
  const lower = (text || '').toLowerCase();

  // Contact
  const emailFound = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text);
  const phoneFound = /(\+?\d{1,3}[\s-])?(?:\d{10}|\d{3}[\s-]\d{3}[\s-]\d{4})/.test(text);
  const contact = (emailFound && phoneFound) ? 20 : (emailFound || phoneFound) ? 10 : 0;

  // Sections
  const commonSections = ['summary','objective','experience','work experience','education','skills','projects','certifications'];
  const foundSections = commonSections.filter(s => lower.includes(s));
  const sections = Math.min(foundSections.length, 6) * (20 / 6);

  // Keywords
  let keywordsScore = 10;
  let matchedKeywords = [];
  if (Array.isArray(jobKeywords) && jobKeywords.length > 0) {
    const matches = jobKeywords.filter(k => lower.includes(k.toLowerCase()));
    matchedKeywords = matches;
    keywordsScore = Math.min(matches.length / jobKeywords.length, 1) * 30;
  }

  // Formatting (simple heuristics)
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(text);
  const longNonAlpha = /[^a-z0-9\s]{25,}/i.test(text);
  const formatting = (!hasHtml && !longNonAlpha) ? 15 : 5;

  // Length
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  const lengthScore = words < 200 ? 0 : (words <= 700 ? 15 : 10);

  const breakdown = {
    contact, sections, keywords: keywordsScore, formatting, length: lengthScore,
    foundSections, matchedKeywords, words
  };

  const total = Math.min(Math.round(contact + sections + keywordsScore + formatting + lengthScore), 100);

  return { score: total, breakdown, foundSections, words, emailFound, phoneFound, matchedKeywords };
}

module.exports = { computeATSScore };
