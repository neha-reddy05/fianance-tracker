import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !jobDescription.trim()) {
      alert("Please upload a resume and paste the job description.");
      return;
    }

    // TODO: send file + jobDescription to backend
    console.log("Uploaded file:", file);
    console.log("Job Description:", jobDescription);

    // For now, redirect to report
    navigate("/report");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-8 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Resume for Analysis
      </h2>

      {/* Resume Upload */}
      <div className="mb-6">
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Resume File (PDF/DOCX)
        </label>
        <input
          type="file"
          id="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-gray-700 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {file && (
        <p className="mb-4 text-sm text-gray-600">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {/* Job Description */}
      <div className="mb-6">
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={6}
          className="w-full text-gray-700 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Analyze Resume
      </button>
    </form>
  );
}

export default UploadForm;
