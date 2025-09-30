// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("students").select("*");
        if (error) throw error;
        setStudents(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students");
      }
      setLoading(false);
    };
    fetchStudents();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading profiles...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <h3>Student Dashboard</h3>
        <ul>
          <li>Basic Info</li>
          <li>Fees</li>
          <li>Attendance</li>
          <li>Results</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        <h2>All Students Profile</h2>

        {students.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Branch</th>
                <th>DOB</th>
                <th>Hostel</th>
                <th>Year</th>
                <th>Email</th>
               
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll_no}</td>
                  <td>{student.branch}</td>
                  <td>{student.dob}</td>
                  <td>{student.hostel}</td>
                  <td>{student.year}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found</p>
        )}
      </div>
    </div>
  );
}
