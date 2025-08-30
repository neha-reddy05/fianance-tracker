type SuggestionBoxProps = {
  suggestions: string[];
};

function SuggestionBox({ suggestions }: SuggestionBoxProps) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
        🎉 No suggestions! Your resume looks great.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Suggestions to Improve
      </h3>
      <ul className="space-y-3">
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="flex items-start bg-gray-50 p-3 rounded-md border border-gray-200"
          >
            <span className="text-blue-600 mr-2">➤</span>
            <span className="text-gray-700">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionBox;
