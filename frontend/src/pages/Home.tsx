function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-6">AI Resume Analyzer</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upload your resume, get an ATS score, and improve it with smart suggestions.
      </p>
      <a
        href="/upload"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Get Started
      </a>
    </div>
  );
}

export default Home;
