import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">
        ResumeAnalyzer
      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link to="/upload" className="hover:text-gray-200">
          Upload
        </Link>
        <Link to="/report" className="hover:text-gray-200">
          Report
        </Link>
        <Link to="/dashboard" className="hover:text-gray-200">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
