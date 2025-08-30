function Dashboard() {
  // Dummy history data
  const history = [
    { id: 1, file: "Resume1.pdf", score: 72, date: "2025-08-01" },
    { id: 2, file: "Resume2.pdf", score: 85, date: "2025-08-15" },
  ];

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h2>

      <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-2">File</th>
              <th className="p-2">ATS Score</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{h.file}</td>
                <td className="p-2 font-semibold">{h.score}%</td>
                <td className="p-2">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
