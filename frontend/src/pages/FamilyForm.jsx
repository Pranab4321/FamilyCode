import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const FamilyForm = () => {
const navigate = useNavigate();
const [selectedValue, setSelectedValue] = useState("");

const [pincode, setPincode] = useState("");
const [formDatas, setFormDatas] = useState({
  pincode: "",
  district: "",
  state: "",
  city: "",
  postOffice: "",
});
  
const [postOffices, setPostOffices] = useState([]);

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

const handlePincodeChange = async (e) => {
  const pincode = e.target.value;

  setPincode(pincode);

  if (pincode.length === 6) {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = await response.json();

      // console.log("Api datas are", data);

      if (data[0].Status === "Success") {

        // Store all post offices
        setPostOffices(data[0].PostOffice);

        // Get state from first result
        const postOffice = data[0].PostOffice[0];

        setFormDatas((previous) => ({
          ...previous,
          state: postOffice.State,
        }));

      } else {
        setPostOffices([]);

        setFormDatas((previous) => ({
          ...previous,
          district: "",
          state: "",
          city: "",
          postOffice: "",
        }));
      }

    } catch (error) {
      console.log("PIN API Error:", error);
      setPostOffices([]);
    }
  } else {
    setPostOffices([]);
  }
};

const districts = [
  ...new Set(
    postOffices.map((postOffice) => postOffice.District)
  ),
];

console.log("Api datas are", districts);

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
              <label htmlFor="fullName">F/C Owner Name *</label>
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
                maxLength={12}
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

              <div className="form-group pin-group">
                <label htmlFor="pinCode">PIN Code *</label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  placeholder="6-digit PIN"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  onChange={handlePincodeChange}
                  required
                />
              </div>

              <div className="form-group pin-group">
                <label htmlFor="pinCode">District *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  placeholder="Enter district name."
                  required
                />
              </div>

              <div className="form-group pin-group">
                <label htmlFor="pinCode">Post Office *</label>
                <input
                  type="text"
                  id="postOffice"
                  name="postOffice"
                  placeholder="Enter district name."
                  required
                />
              </div>



              {/* <div className="form-group">
              <label htmlFor="district">District *</label>
              <select
                value={formDatas.district}
                onChange={(e) =>
                  setFormDatas((previous) => ({
                    ...previous,
                    district: e.target.value,
                  }))
                }
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              </div>


              <div className="form-group">
               <label htmlFor="postOffice">Post Office *</label>

                <select
                  name="postOffice"
                  value={formDatas.postOffice || ""}
                  onChange={(e) =>
                    setFormDatas((previous) => ({
                      ...previous,
                      postOffice: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Post Office</option>

                  {postOffices.map((postOffice, index) => (
                    <option key={index} value={postOffice.Name}>
                      {postOffice.Name}
                    </option>
                  ))}
                </select>
              </div> */}

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