function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
      <p className="text-sm">
        © {new Date().getFullYear()} ResumeAnalyzer. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Built with ❤️ using React, TypeScript & TailwindCSS
      </p>
    </footer>
  );
}

export default Footer;
