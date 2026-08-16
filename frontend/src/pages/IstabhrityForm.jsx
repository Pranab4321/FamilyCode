import React from "react";
import { useState, useEffect } from "react";

import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const IstabhrityForm = () => {

const [familyData, setFamilyData] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);
const [newMember, setNewMember] = useState("");

const [persons, setPersons] = useState(() => {
  const savedPersons = localStorage.getItem("persons");

  return savedPersons ? JSON.parse(savedPersons) : [];
});

const selectedValue = localStorage.getItem("selectedValue");
const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("currentFamily");

    if (savedData) {
      const fcData = setFamilyData(JSON.parse(savedData));
    }
  }, []);

console.log("Previous fetched data: ",familyData);


const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const personData = Object.fromEntries(formData.entries());

  // Convert amount to 2 decimal places
  if (personData.amount) {
    personData.amount = Number(personData.amount).toFixed(2);
  }

  setPersons((previousPersons) => {
    const updatedPersons = [
      ...previousPersons,
      personData
    ];

    localStorage.setItem(
      "persons",
      JSON.stringify(updatedPersons)
    );

    console.log("Updated array:", updatedPersons);

    return updatedPersons;
  });

  // Show success popup
  setShowSuccess(true);

  // Reset form
  e.currentTarget.reset();
};


useEffect(()=>{
  console.log("Person updated ", persons);
},[persons])

const generatePDF = () => {
  if (persons.length === 0) {
    alert("Please submit at least one person's data.");
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 20;

  // ==========================================
  // TITLE
  // ==========================================

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");

  doc.text("Istabhrity Details", pageWidth / 2, y, {
    align: "center",
  });

  y += 12;

  // ==========================================
  // FAMILY DETAILS
  // ==========================================

  if (familyData) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text("Family Details", 15, y);

    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `F/C Owner Name: ${familyData.fullName || ""}`,
      15,
      y
    );

    doc.text(
      `Family Code: ${familyData.familyCode || ""}`,
      110,
      y
    );

    y += 6;

    doc.text(
      `Village/City: ${familyData.village || ""}`,
      15,
      y
    );

    doc.text(
      `District: ${familyData.district || ""}`,
      110,
      y
    );

    y += 6;

    doc.text(
      `Post Office: ${familyData.postOffice || ""}`,
      15,
      y
    );

    doc.text(
      `State: ${familyData.state || ""}`,
      110,
      y
    );

    y += 6;

    doc.text(
      `PIN Code: ${familyData.pinCode || ""}`,
      15,
      y
    );

    y += 12;
  }

  // ==========================================
  // PERSON DETAILS
  // ==========================================

  persons.forEach((person, index) => {

    // Approximate height required for one person
    if (y > pageHeight - 100) {
      doc.addPage();
      y = 20;
    }

    // ========================================
    // PERSON HEADER
    // ========================================

    doc.setFillColor(30, 30, 30);
    doc.rect(15, y, pageWidth - 30, 9, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text(
      `Person ${index + 1}`,
      20,
      y + 6
    );

    doc.setTextColor(0, 0, 0);

    y += 14;

    // ========================================
    // PERSONAL INFORMATION
    // ========================================

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const leftX = 18;
    const rightX = 108;

    const addRow = (leftLabel, leftValue, rightLabel, rightValue) => {

      doc.setFont("helvetica", "bold");

      doc.text(`${leftLabel}:`, leftX, y);

      doc.setFont("helvetica", "normal");

      doc.text(
        `${leftValue || "-"}`,
        leftX + 32,
        y
      );

      if (rightLabel) {

        doc.setFont("helvetica", "bold");

        doc.text(
          `${rightLabel}:`,
          rightX,
          y
        );

        doc.setFont("helvetica", "normal");

        doc.text(
          `${rightValue || "-"}`,
          rightX + 32,
          y
        );
      }

      y += 7;
    };

    addRow(
      "DP Serial / Contact",
      person.dpSerialNo,
      "Full Name",
      person.fullName
    );

    addRow(
      "Ritwik Name",
      person.ritwikName,
      "ID No",
      person.idNumber
    );

    // Only show these if the person is new
    if (person.dikshaDate || person.guardian) {

      addRow(
        "Diksha Date",
        person.dikshaDate,
        "Guardian",
        person.guardian
      );
    }

    y += 3;

    // ========================================
    // CONTRIBUTION HEADER
    // ========================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("Contribution Details", 18, y);

    y += 6;

    // ========================================
    // CONTRIBUTIONS
    // ========================================

    doc.setFontSize(9);

    addRow(
      "Swastyayani",
      person.swastyayani,
      "Istabhriti",
      person.istabhriti
    );

    addRow(
      "Acharya-bhriti",
      person.acharyaBhriti,
      "Dakshina",
      person.dakshina
    );

    addRow(
      "Sangathani",
      person.sangathani,
      "Anandabazar",
      person.anandabazar
    );

    addRow(
      "Pranami",
      person.pranami,
      "Ritwiki",
      person.ritwiki
    );

    addRow(
      "Srimandir",
      person.srimandir,
      "",
      ""
    );

    // ========================================
    // PERSON SEPARATOR
    // ========================================

    y += 4;

    doc.setDrawColor(180, 180, 180);

    doc.line(
      15,
      y,
      pageWidth - 15,
      y
    );

    y += 10;
  });

  // ==========================================
  // DOWNLOAD
  // ==========================================

  doc.save(
    `${familyData?.familyCode || "family"}-details.pdf`
  );

setPersons(() => {
  const savedPersons = localStorage.removeItem("persons");

  return savedPersons ? JSON.parse(savedPersons) : [];
});

  navigate("/");
};

  return (
    <>
    <Navbar generatePDF={generatePDF}/>

<div className="istabhrity-page">

  {/* LEFT SIDE */}
  <div className="family-details-card">
    {/* Family details */}
    {familyData && (
  <div className="family-details-card">
    <div className="family-card-header">
      <h2>Family Details</h2>
      <span>Submitted Information</span>
    </div>

    <div className="family-info">

      <div className="family-info-item">
        <span>F/C Owner Name</span>
        <strong>{familyData.fullName}</strong>
      </div>

      <div className="family-info-item">
        <span>Family Code</span>
        {selectedValue === "yes"?
            <strong>{familyData.familyCode}</strong>
            :<strong>New</strong>
        }
        
      </div>

      <div className="family-info-item">
        <span>Village/City</span>
        <strong>{familyData.village}</strong>
      </div>

      <div className="family-info-item">
        <span>District</span>
        <strong>{familyData.district}</strong>
      </div>

      <div className="family-info-item">
        <span>Post Office</span>
        <strong>{familyData.postOffice}</strong>
      </div>

      <div className="family-info-item">
        <span>State</span>
        <strong>{familyData.state}</strong>
      </div>

      <div className="family-info-item">
        <span>PIN Code</span>
        <strong>{familyData.pinCode}</strong>
      </div>

    </div>
  </div>
)}
  </div>

  {/* RIGHT SIDE */}
    <div className="family-form-page">
      <div className="family-form-card">
        <div className="form-header">
          <h1>Istabhrity Form</h1>
          <p>Enter the required details below</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
          <div className="form-section">
            <h2>Personal Details</h2>

            <div className="address-grid">

              <div className="form-group">
                <label htmlFor="dpSerialNo">
                  DP Serial No / Contact No
                </label>

                <input
                  type="text"
                  id="dpSerialNo"
                  name="dpSerialNo"
                  placeholder="Enter DP Serial No / Contact No"
                  required
                />
              </div>
            
            {selectedValue === "yes" && 
            <div className="form-group">
              <label htmlFor="familyCode">Is a new Member? *</label>
              <select
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="no">Old Member</option>
                <option value="yes">New Member</option>
              </select>
            </div>
            }
            
              
              {selectedValue === "no" || newMember === "yes" && (
                <>
                <div className="form-group">
                <label htmlFor="dpSerialNo">
                    Diksha Date
                </label>

                <input
                  type="Date"
                  id="Date"
                  name="Date"
                  placeholder="DD/MM/YYYY"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dpSerialNo">
                    Guardian Name
                </label>

                <input
                  type="text"
                  id="guardian"
                  name="guardian"
                  placeholder="Enter Guardian name"
                  required
                />
              </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="fullName">
                  Member Name
                </label>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ritwikName">
                  Ritwik Name
                </label>

                <input
                  type="text"
                  id="ritwikName"
                  name="ritwikName"
                  placeholder="Enter Ritwik name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="idNumber">
                  Aadhaar/Voter ID (Optional)
                </label>

                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  placeholder="Enter Aadhaar / Voter ID No"
                />
              </div>

            </div>
          </div>


          {/* Contribution Details */}
          <div className="form-section">
            <h2>Contribution Details</h2>

            <div className="address-grid">

              <div className="form-group">
                <label htmlFor="swastyayani">
                  Swastyayani
                </label>

                <input
                  type="number"
                  id="swastyayani"
                  name="swastyayani"
                  step="0.01"
                  min="0"
                  max={3}
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="istabhriti">
                  Istabhriti
                </label>

                <input
                  type="number"
                  id="istabhriti"
                  name="istabhriti"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="acharyaBhriti">
                  Acharya-bhriti
                </label>

                <input
                  type="number"
                  id="acharyaBhriti"
                  name="acharyaBhriti"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dakshina">
                  Dakshina
                </label>

                <input
                  type="number"
                  id="dakshina"
                  name="dakshina"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sangathani">
                  Sangathani
                </label>

                <input
                  type="number"
                  id="sangathani"
                  name="sangathani"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="anandabazar">
                  Anandabazar
                </label>

                <input
                  type="number"
                  id="anandabazar"
                  name="anandabazar"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pranami">
                  Pranami
                </label>

                <input
                  type="number"
                  id="pranami"
                  name="pranami"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ritwiki">
                  Ritwiki
                </label>

                <input
                  type="number"
                  id="ritwiki"
                  name="ritwiki"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="srimandir">
                  Srimandir
                </label>

                <input
                  type="number"
                  id="srimandir"
                  name="srimandir"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>

            </div>
          </div>


          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit Details
          </button>

        </form>

      </div>
    </div>

</div>

{showSuccess && (
  <div className="success-overlay">
    <div className="success-modal">

      <div className="success-icon">
        ✓
      </div>

      <h2>Done!</h2>
      <h2>Now You Can Add a New Member!</h2>
      <h2>Or Go To Preview</h2>
      <p>
        Member added successfully.
      </p>

      <button
        onClick={() => {
          setShowSuccess(false);

          // Next task goes here
          // Example:
          // navigate("/preview");
        }}
      >
        OK
      </button>

    </div>
  </div>
)}
    </>
  );
};

export default IstabhrityForm;