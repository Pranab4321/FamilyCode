import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const FamilyForm = () => {
const navigate = useNavigate();
const [selectedValue, setSelectedValue] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const familyData = Object.fromEntries(formData.entries());

  // Save the current family data
  localStorage.setItem("currentFamily", JSON.stringify(familyData));
  localStorage.setItem("selectedValue", selectedValue);

  console.log("Saved:", familyData);

  // Navigate to IstabhrityForm
  // If using React Router:
  navigate("/istabhrity");
};

  return (
    <div className="family-form-page">
      <div className="family-form-card">
        <div className="form-header">
          <h1>Family Registration</h1>
          <p>Enter your family details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="form-section">
            <h2>Personal Details</h2>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="familyCode">Does F/C Exist *</label>
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="yes">Old F/C</option>
                <option value="no">New F/C</option>
              </select>
            </div>

            {selectedValue === "yes" && 
            <div className="form-group">
              <label htmlFor="familyCode">Family Code *</label>
              <input
                type="text"
                id="familyCode"
                name="familyCode"
                placeholder="Enter family code"
                required
              />
            </div>
            }
            

          </div>

          {/* Address Details */}
          <div className="form-section">
            <h2>Address Details</h2>

            <div className="address-grid">
              <div className="form-group">
                <label htmlFor="village">Village *</label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  placeholder="Enter village"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="district">District *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postOffice">Post Office *</label>
                <input
                  type="text"
                  id="postOffice"
                  name="postOffice"
                  placeholder="Enter post office"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="form-group pin-group">
                <label htmlFor="pinCode">PIN Code *</label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  placeholder="6-digit PIN"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default FamilyForm;