// src/pages/Parent.jsx
import React from "react";
import "./Parent.css";

// Sample Data
const attendanceSummary = [
  { course: "Maths", attended: 18, total: 20 },
  { course: "Physics", attended: 15, total: 20 },
  { course: "Chemistry", attended: 16, total: 20 },
];

const feeStatus = [
  { semester: "Sem 1", amountPaid: 20000, amountPending: 5000 },
  { semester: "Sem 2", amountPaid: 18000, amountPending: 2000 },
];

const examResults = [
  { course: "Maths", grade: "A" },
  { course: "Physics", grade: "B+" },
  { course: "Chemistry", grade: "A-" },
];

const notifications = [
  { message: "Fee due for Semester 2", date: "2025-09-10" },
  { message: "Parent-teacher meeting on 20th Sep", date: "2025-09-12" },
];

export default function Parent() {
  return (
    <div className="parent-container">
      {/* Sidebar */}
      <aside className="parent-sidebar">
        <h2>Parent Dashboard</h2>
        <ul>
          <li className="active">Attendance Summary</li>
          <li>Fee Status</li>
          <li>Exam Results</li>
          <li>Notifications</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="parent-main">

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Classes</h3>
            <p>{attendanceSummary.reduce((a, c) => a + c.total, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Classes Attended</h3>
            <p>{attendanceSummary.reduce((a, c) => a + c.attended, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Fees Paid</h3>
            <p>₹{feeStatus.reduce((a, c) => a + c.amountPaid, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Fees Pending</h3>
            <p>₹{feeStatus.reduce((a, c) => a + c.amountPending, 0)}</p>
          </div>
        </div>

        {/* Attendance Summary Table */}
        <section className="parent-section">
          <h2>📊 Attendance Summary</h2>
          <table className="parent-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Attended</th>
                <th>Total Classes</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {attendanceSummary.map((item, index) => (
                <tr key={index}>
                  <td>{item.course}</td>
                  <td>{item.attended}</td>
                  <td>{item.total}</td>
                  <td>{((item.attended / item.total) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Fee Status Table */}
        <section className="parent-section">
          <h2>💰 Fee Payment Status</h2>
          <table className="parent-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Amount Paid</th>
                <th>Amount Pending</th>
              </tr>
            </thead>
            <tbody>
              {feeStatus.map((item, index) => (
                <tr key={index}>
                  <td>{item.semester}</td>
                  <td>₹{item.amountPaid}</td>
                  <td>₹{item.amountPending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Exam Results Table */}
        <section className="parent-section">
          <h2>📝 Exam Results</h2>
          <table className="parent-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.course}</td>
                  <td>{item.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Notifications */}
        <section className="parent-section">
          <h2>🔔 Notifications</h2>
          <ul className="notifications-list">
            {notifications.map((note, index) => (
              <li key={index}>
                <span>{note.date}:</span> {note.message}
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
