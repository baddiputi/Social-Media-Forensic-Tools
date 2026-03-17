import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-4 mt-auto shadow-inner">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SM Forensics Tool. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
