import React from "react";

export default function AboutPage() {
  return (
    <div className="udyam-card">
      <h2>About This Assignment</h2>
      <p>
        This project is a demo Udyam registration frontend. It follows the stepwise Aadhaar and PAN registration form, just like the official MSME government portal.
      </p>
      <ul>
        <li>Step 1: Aadhaar Number + Name + Declaration</li>
        <li>Step 2: PAN Details + Organisation Type + Declaration</li>
        <li>Responsive, blue/white theme, with real-world error handling.</li>
        <li>
          <b>Tech Stack:</b> ReactJS, NodeJS Express API, Prisma ORM, PostgreSQL.<br />
          <b>Assignment Goal:</b> Scrape the Udyam site’s form, build a backend that validates/saves data, and create a user-friendly frontend to match the workflow!
        </li>
      </ul>
      <a href="/" style={{color:"#1976d2",fontWeight:"bold"}}>← Back to registration</a>
    </div>
  );
}
