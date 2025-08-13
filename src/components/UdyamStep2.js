import React, { useState } from "react";
import axios from "axios";

export default function UdyamStep2({ aadhaarData }) {
  const [fields, setFields] = useState({
    pan: "",
    panName: "",
    dob: "",
    orgType: "",
    declaration: false,
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post("https://backendopenbiz.onrender.com/submit-pan", {
        ...aadhaarData, // Aadhaar values from Step 1
        "ctl00$ContentPlaceHolder1$ddlTypeofOrg": fields.orgType,
        "ctl00$ContentPlaceHolder1$txtPan": fields.pan,
        "ctl00$ContentPlaceHolder1$txtPanName": fields.panName,
        "ctl00$ContentPlaceHolder1$txtdob": fields.dob,
        "ctl00$ContentPlaceHolder1$chkDecarationP": fields.declaration ? "on" : ""
      });

      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setErrors(err.response ? err.response.data.errors || ["Server error"] : ["Network error"]);
    }
  }

  if (success) {
    return (
      <div className="udyam-card">
        <h2 style={{ color: '#1976d2', marginBottom: "15px" }}>Submission Successful!</h2>
        <p>Your registration data has been saved. Thank you.</p>
      </div>
    );
  }

  return (
    <div className="udyam-card">
      <div className="udyam-header">PAN Card Verification</div>
      <form onSubmit={handleSubmit} autoComplete="off">
        {errors.length > 0 && (
          <div className="error-box">{errors.map((err, idx) => <div key={idx}>{err}</div>)}</div>
        )}

        <label>PAN Number / <span>पैन संख्या</span></label>
        <input
          type="text"
          placeholder="Enter PAN Number"
          value={fields.pan}
          maxLength={10}
          onChange={e => setFields({ ...fields, pan: e.target.value.toUpperCase() })}
          required
        />

        <label>Name as per PAN / <span>नाम पैन कार्ड के अनुसार</span></label>
        <input
          type="text"
          placeholder="Name as per PAN"
          value={fields.panName}
          onChange={e => setFields({ ...fields, panName: e.target.value })}
          required
        />

        <label>Date of Birth / <span>जन्म तिथि</span></label>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          value={fields.dob}
          onChange={e => setFields({ ...fields, dob: e.target.value })}
          required
        />

        <label>
          Type of Organisation / <span>संगठन के प्रकार</span>
          <select
            value={fields.orgType}
            required
            onChange={e => setFields({ ...fields, orgType: e.target.value })}
          >
            <option value="">--Select--</option>
            <option value="1">Proprietary / एकल स्वामित्व</option>
            <option value="2">Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)</option>
            <option value="3">Partnership / पार्टनरशिप</option>
            <option value="4">Co-Operative / सहकारी</option>
            <option value="5">Private Limited Company / प्राइवेट लिमिटेड कंपनी</option>
            <option value="6">Public Limited Company / पब्लिक लिमिटेड कंपनी</option>
            <option value="7">Self Help Group / स्वयं सहायता समूह</option>
            <option value="8">Limited Liability Partnership / सीमित दायित्व भागीदारी</option>
            <option value="9">Society / सोसाईटी</option>
            <option value="10">Trust / ट्रस्ट</option>
            <option value="11">Others / अन्य</option>
          </select>
        </label>

        <div className="udyam-declaration-box">
          <input
            type="checkbox"
            className="udyam-declaration-checkbox"
            checked={fields.declaration}
            onChange={e => setFields({ ...fields, declaration: e.target.checked })}
            required
            id="panDeclaration"
          />
          <label htmlFor="panDeclaration" className="udyam-declaration-text">
          I, the holder of the above PAN, hereby give my consent to Ministry of MSME, Government of India, for using my data/ information available in the Income Tax Returns filed by me, and also the same available in the GST Returns and also from other Government organizations, for MSME classification and other official purposes, in pursuance of the MSMED Act, 2006.

          </label>
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={
            !fields.pan ||
            fields.pan.length !== 10 ||
            !fields.panName ||
            !fields.dob ||
            !fields.orgType ||
            !fields.declaration
          }
        >
          Validate PAN
        </button>
      </form>
    </div>
  );
}
