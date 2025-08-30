type ScoreCardProps = {
  score: number;
};

function ScoreCard({ score }: ScoreCardProps) {
  // Pick color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-center">
      <p className="text-lg mb-2">Your ATS Score:</p>
      <p className={`text-5xl font-bold ${getColor(score)}`}>{score}%</p>
      <div className="mt-4">
        {score >= 80 && (
          <p className="text-green-600 font-medium">
            ✅ Great! Your resume is ATS-friendly.
          </p>
        )}
        {score >= 50 && score < 80 && (
          <p className="text-yellow-600 font-medium">
            ⚠️ Decent, but there’s room for improvement.
          </p>
        )}
        {score < 50 && (
          <p className="text-red-600 font-medium">
            ❌ Low ATS score. Needs major improvements.
          </p>
        )}
      </div>
    </div>
  );
}

export default ScoreCard;
