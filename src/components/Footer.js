import React from "react";

export default function Footer() {
  return (
    <footer className="udyam-footer">
      <div>
        UDYAM REGISTRATION &copy; {new Date().getFullYear()} | Ministry of MSME | Details <b>Manohar/k3manohar@gmail.com</b>
      </div>
      <div style={{marginTop:6, fontSize:"13px"}}>
        For help: champions@msme.gov.in
      </div>
    </footer>
  );
}
