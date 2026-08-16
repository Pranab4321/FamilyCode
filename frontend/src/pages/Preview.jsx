import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Preview = () => {
  const [persons, setPersons] = useState([]);
  // const {navigate} = useNavigate();

  useEffect(() => {
    const savedPersons = localStorage.getItem("persons");

    if (savedPersons) {
      setPersons(JSON.parse(savedPersons));
    }
  }, []);


  return (
    <>
    <div className="preview-page">

      {/* Header */}
      <div className="preview-header">
        <div>
          <h1>Preview</h1>
          {/* <p>Review all submitted Istabhrity details</p> */}
        </div>

        <Link to="/istabhrity">
        <button className="navbar-pdf-btn">
          Go Back
        </button>
        </Link>
        

        <div className="person-count">
          <span>{persons.length}</span>
          <small>Entries</small>
        </div>
      </div>

      {/* No data */}
      {persons.length === 0 ? (
        <div className="empty-preview">
          <div className="empty-icon">○</div>
          <h2>No Data Available</h2>
          <p>
            Submit at least one person's details from the
            Istabhrity form to see the preview here.
          </p>
        </div>
      ) : (
        <div className="persons-list">

          {persons.map((person, index) => (
            <div className="person-preview-card" key={index}>

              {/* Person Header */}
              <div className="person-card-header">

                <div className="person-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2>{person.fullName || "Unnamed Person"}</h2>

                  <span>
                    DP Serial / Contact:{" "}
                    {person.dpSerialNo || "Not provided"}
                  </span>
                </div>

              </div>

              {/* Personal Information */}
              <div className="preview-section">

                <div className="preview-section-title">
                  Personal Information
                </div>

                <div className="preview-grid">

                  <div className="preview-item">
                    <span>Full Name</span>
                    <strong>{person.fullName || "-"}</strong>
                  </div>

                  <div className="preview-item">
                    <span>DP Serial / Contact</span>
                    <strong>{person.dpSerialNo || "-"}</strong>
                  </div>

                  <div className="preview-item">
                    <span>Ritwik Name</span>
                    <strong>{person.ritwikName || "-"}</strong>
                  </div>

                  <div className="preview-item">
                    <span>Aadhaar / Voter ID</span>
                    <strong>{person.idNumber || "-"}</strong>
                  </div>

                  {/* Show only for new F/C */}
                  {person.dikshaDate && (
                    <div className="preview-item">
                      <span>Diksha Date</span>
                      <strong>{person.dikshaDate}</strong>
                    </div>
                  )}

                  {person.guardian && (
                    <div className="preview-item">
                      <span>Guardian Name</span>
                      <strong>{person.guardian}</strong>
                    </div>
                  )}

                </div>
              </div>

              {/* Contribution Details */}
              <div className="preview-section">

                <div className="preview-section-title">
                  Contribution Details
                </div>

                <div className="contribution-grid">

                  <div className="contribution-item">
                    <span>Swastyayani</span>
                    <strong>₹ {person.swastyayani || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Istabhriti</span>
                    <strong>₹ {person.istabhriti || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Acharya-bhriti</span>
                    <strong>₹ {person.acharyaBhriti || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Dakshina</span>
                    <strong>₹ {person.dakshina || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Sangathani</span>
                    <strong>₹ {person.sangathani || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Anandabazar</span>
                    <strong>₹ {person.anandabazar || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Pranami</span>
                    <strong>₹ {person.pranami || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Ritwiki</span>
                    <strong>₹ {person.ritwiki || "0"}</strong>
                  </div>

                  <div className="contribution-item">
                    <span>Srimandir</span>
                    <strong>₹ {person.srimandir || "0"}</strong>
                  </div>

                </div>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
    </>
  );
};

export default Preview;