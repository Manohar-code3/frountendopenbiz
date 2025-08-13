import React, { useState } from "react";
import axios from "axios";

export default function UdyamStep1({ onAadhaarValidated }) {
  const [fields, setFields] = useState({
    aadhaar: "",
    name: "",
    declaration: false,
  });
  const [errors, setErrors] = useState([]);

  async function handleValidate(e) {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post("https://backendopenbiz.onrender.com/validate-aadhaar", {
        "ctl00$ContentPlaceHolder1$txtadharno": fields.aadhaar,
        "ctl00$ContentPlaceHolder1$txtownername": fields.name,
        "ctl00$ContentPlaceHolder1$chkDecarationA": fields.declaration ? "on" : ""
      });

      if (res.data.success) {
        // Pass Aadhaar data in exact format backend expects
        onAadhaarValidated({
          "ctl00$ContentPlaceHolder1$txtadharno": fields.aadhaar,
          "ctl00$ContentPlaceHolder1$txtownername": fields.name,
          "ctl00$ContentPlaceHolder1$chkDecarationA": fields.declaration ? "on" : ""
        });
      }
    } catch (err) {
      setErrors(err.response ? err.response.data.errors || ["Server error"] : ["Network error"]);
    }
  }

  return (
    <div className="udyam-card">
      <div className="udyam-header">Aadhaar Verification With OTP</div>
      <form onSubmit={handleValidate} autoComplete="off">
        {errors.length > 0 && (
          <div className="error-box">
            {errors.map((err, idx) => <div key={idx}>{err}</div>)}
          </div>
        )}

        <div className="udyam-row">
          <div className="udyam-col">
            <label>1. Aadhaar Number / <span>आधार संख्या</span></label>
            <input
              type="text"
              maxLength={12}
              inputMode="numeric"
              placeholder="Your Aadhaar No"
              value={fields.aadhaar}
              onChange={e => setFields({ ...fields, aadhaar: e.target.value.replace(/\D/g, "") })}
              required
            />
          </div>
          <div className="udyam-col">
            <label>2. Name of Entrepreneur / <span>उधमी का नाम</span></label>
            <input
              type="text"
              placeholder="Name as per Aadhaar"
              value={fields.name}
              onChange={e => setFields({ ...fields, name: e.target.value })}
              required
            />
          </div>
        </div>

        <ul className="udyam-info">
          <li>Aadhaar number shall be required for Udyam Registration.</li>
          <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
          <li>In case of a Company or LLP/Trust ... <span style={{ color: '#FFFFFF', textDecoration: 'underline' }}>vide S.O. 1055(E) dated 05th March 2021</span> ...</li>
        </ul>

        <div className="udyam-declaration-box">
          <input
            type="checkbox"
            className="udyam-declaration-checkbox"
            checked={fields.declaration}
            onChange={e => setFields({ ...fields, declaration: e.target.checked })}
            required
            id="aadhaarDeclaration"
          />
          <label htmlFor="aadhaarDeclaration" className="udyam-declaration-text">
            I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as allotted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. <br />
            <b>/ मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।</b>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={
            !fields.aadhaar ||
            fields.aadhaar.length !== 12 ||
            !fields.name ||
            !fields.declaration
          }
        >
          Validate & Generate OTP
        </button>
      </form>
    </div>
  );
}
