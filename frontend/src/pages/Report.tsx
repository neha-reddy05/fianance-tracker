import ScoreCard from "../components/ScoreCard";
import SuggestionBox from "../components/SuggestionBox";

function Report() {
  const score = 78;
  const suggestions = [
    "Add more keywords related to the job description",
    "Fix inconsistent formatting",
    "Include measurable achievements",
  ];

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Resume Analysis Report
      </h2>

      {/* ScoreCard component */}
      <ScoreCard score={score} />

      {/* SuggestionBox component */}
      <div className="mt-8 w-full max-w-lg">
        <SuggestionBox suggestions={suggestions} />
      </div>
    </div>
  );
}

export default Report;
