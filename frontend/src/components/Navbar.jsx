import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({generatePDF}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo / Brand */}
        <Link to="/" className="navbar-brand">
          Istabhrity
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <Link to="/istabhrity" className="navbar-link">
            Home
          </Link>

          <Link to="/preview" className="navbar-link">
            Preview
          </Link>

          <button className="navbar-pdf-btn" onClick={generatePDF}>
            Generate PDF
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;