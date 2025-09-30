// src/pages/Faculty.jsx
import React, { useState, useEffect } from "react";
import "./Faculty.css";
import { supabase } from "./supabaseClient";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch faculty data from Supabase
  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("faculty").select("*");
      if (error) console.error("Error fetching faculty:", error.message);
      else setFaculty(data);
      setLoading(false);
    };
    fetchFaculty();
  }, []);

  return (
    <div className="faculty-container">
      {/* Sidebar */}
      <div className="faculty-sidebar">
        <h3>Faculty Dashboard</h3>
        <ul>
          <li>Attendance / Leave</li>
          <li>Salary</li>
          <li>Experience</li>
          <li>Faculty List</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="faculty-main">
        <h2>Faculty List</h2>

        {loading ? (
          <p>Loading faculty...</p>
        ) : faculty.length === 0 ? (
          <p>No faculty found.</p>
        ) : (
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Attendance %</th>
                <th>Leave</th>
                <th>Salary</th>
                <th>Workload</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f) => (
                <tr key={f.id}>
                  <td>{f.full_name}</td>
                  <td>{f.department}</td>
                  <td>{f.designation}</td>
                  <td>{f.email || "-"}</td>
                  <td>{f.phone || "-"}</td>
                  <td>{f.attendance || 0}</td>
                  <td>{f.leave || 0}</td>
                  <td>{f.salary || 0}</td>
                  <td>{f.workload || "-"}</td>
                  <td>{f.experience || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
