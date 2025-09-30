import React, { useState } from "react";
import "./Placements.css";

export default function Placements() {
  const [viewDetails, setViewDetails] = useState(null);

  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      packages: { min: "20 LPA", max: "45 LPA", avg: "30 LPA" },
      internships: "Summer Internships: 10-12 LPA",
      students: [
        { name: "Rohan Boddh", branch: "CSE" },
        { name: "Rohan Singh", branch: "IT" },
        { name: "Priya Kapoor", branch: "CSE" },
      ],
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      packages: { min: "18 LPA", max: "40 LPA", avg: "28 LPA" },
      internships: "Summer Internships: 9-11 LPA",
      students: [
        { name: "Aditya Verma", branch: "CSE" },
        { name: "Nisha Gupta", branch: "ECE" },
        { name: "Karan Mehta", branch: "IT" },
      ],
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      packages: { min: "16 LPA", max: "38 LPA", avg: "25 LPA" },
      internships: "Summer Internships: 8-10 LPA",
      students: [
        { name: "Ritu Sharma", branch: "CSE" },
        { name: "Anjali Rao", branch: "IT" },
      ],
    },
    {
  name: "Infosys",
  logo: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Infosys_logo.svg"
      alt="Infosys"
      style={{ width: "50px", height: "50px" }}
    />
  ),
  packages: { min: "8 LPA", max: "20 LPA", avg: "12 LPA" },
  internships: "Summer Internships: 4-6 LPA",
  students: [
    { name: "Rahul Yadav", branch: "ECE" },
    { name: "Priya Sharma", branch: "CSE" },
  ],
},

    {
      name: "TCS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/TCS-Logo.svg",
      packages: { min: "7 LPA", max: "18 LPA", avg: "11 LPA" },
      internships: "Summer Internships: 3-5 LPA",
      students: [
        { name: "Rudra Pratap", branch: "CSE" },
        { name: "Ankit Verma", branch: "IT" },
      ],
    },
    {
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Systems_logo_and_wordmark.svg",
      packages: { min: "15 LPA", max: "35 LPA", avg: "22 LPA" },
      internships: "Summer Internships: 7-9 LPA",
      students: [
        { name: "Tazim Kassar", branch: "CSE" },
        { name: "Meera Nair", branch: "IT" },
      ],
    },
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
      packages: { min: "20 LPA", max: "40 LPA", avg: "30 LPA" },
      internships: "Summer Internships: 10-12 LPA",
      students: [
        { name: "Varun Saxena", branch: "CSE" },
        { name: "Kunal", branch: "IT" },
      ],
    },
    {
      name: "Intel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
      packages: { min: "15 LPA", max: "28 LPA", avg: "20 LPA" },
      internships: "Summer Internships: 6-8 LPA",
      students: [
        { name: "Aditya Singh", branch: "ECE" },
        { name: "Priya Nair", branch: "CSE" },
      ],
    },
    {
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Cisco_logo_blue_2016.svg",
      packages: { min: "14 LPA", max: "26 LPA", avg: "18 LPA" },
      internships: "Summer Internships: 5-7 LPA",
      students: [
        { name: "Ritika Sharma", branch: "IT" },
        { name: "Kunal Mehta", branch: "ECE" },
      ],
    },
    {
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      packages: { min: "12 LPA", max: "24 LPA", avg: "16 LPA" },
      internships: "Summer Internships: 5-6 LPA",
      students: [
        { name: "Amit Singh", branch: "CSE" },
        { name: "Neha Kapoor", branch: "IT" },
      ],
    },
    // ... add remaining companies
  ];

  return (
    <div className="placements-container">
      <h1>Campus Placements</h1>
      <div className="companies-grid">
        {companies.map((comp, idx) => (
          <div key={idx} className="company-card">
            <img src={comp.logo} alt={comp.name} className="company-logo" />
            <h3>{comp.name}</h3>
            <p>
              <strong>Packages:</strong> Min: {comp.packages.min}, Max: {comp.packages.max}, Avg: {comp.packages.avg}
            </p>
            <p>
              <strong>Internships:</strong> {comp.internships}
            </p>
            <button
              className="view-btn"
              onClick={() =>
                setViewDetails(viewDetails === idx ? null : idx)
              }
            >
              {viewDetails === idx ? "Hide Students" : "View Students"}
            </button>
            {viewDetails === idx && (
              <div className="students-list">
                <h4>Placed Students:</h4>
                <ul>
                  {comp.students.map((s, i) => (
                    <li key={i} style={{ color: "black" }}>
                      {s.name} ({s.branch})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
