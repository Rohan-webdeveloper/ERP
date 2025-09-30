// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import "./Admin.css";
import { supabase } from "./supabaseClient";

// Tabs
const STUDENT_TABS = ["Personal Info", "Academic Info", "Parent Info"];
const FACULTY_TABS = ["Personal Info", "Job Info", "Attendance", "Experience"];

// Static Departments & Courses
const DEPARTMENTS = ["Engineering", "Law", "Business", "Science"];
const COURSES = {
  Engineering: ["Computer Science", "Mechanical", "Electrical"],
  Law: ["Civil Law", "Criminal Law"],
  Business: ["Finance", "Marketing", "HR"],
  Science: ["Biology", "Chemistry", "Physics"],
};

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "students" | "faculty"
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Sidebar
  const [activeSidebar, setActiveSidebar] = useState("students");

  // Dept & Course state
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchFaculty();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase.from("students").select("*");
    if (!error) setStudents(data || []);
  };

  const fetchFaculty = async () => {
    const { data, error } = await supabase.from("faculty").select("*");
    if (!error) setFaculty(data || []);
  };

  const openModal = (type, record = null) => {
    setModalType(type);
    setSelectedItem(record);
    setActiveTab(0);
    setSelectedDept(record?.department || "");
    setSelectedCourse(record?.course || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setSelectedDept("");
    setSelectedCourse("");
  };

  // Save Student / Faculty
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.target));

    // add dept + course
    values.department = selectedDept;
    values.course = selectedCourse;

    try {
      if (modalType === "students") {
        if (selectedItem) {
          await supabase.from("students").update(values).eq("id", selectedItem.id);
        } else {
          await supabase.from("students").insert([values]);
        }
        await fetchStudents();
      } else {
        if (selectedItem) {
          await supabase.from("faculty").update(values).eq("id", selectedItem.id);
        } else {
          await supabase.from("faculty").insert([values]);
        }
        await fetchFaculty();
      }
      closeModal();
    } catch (err) {
      console.error("Save error:", err.message);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    if (type === "students") {
      await supabase.from("students").delete().eq("id", id);
      fetchStudents();
    } else {
      await supabase.from("faculty").delete().eq("id", id);
      fetchFaculty();
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <div
          className={`sidebar-item ${activeSidebar === "students" ? "active" : ""}`}
          onClick={() => setActiveSidebar("students")}
        >
          Students
        </div>
        <div
          className={`sidebar-item ${activeSidebar === "faculty" ? "active" : ""}`}
          onClick={() => setActiveSidebar("faculty")}
        >
          Faculty
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {activeSidebar === "students" && (
          <section className="admin-section">
            <h2>Students</h2>
            <button className="add-btn" onClick={() => openModal("students")}>
              Add Student
            </button>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Course</th>
                  <th>Parent Name</th>
                  <th>Parent Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.roll_no}</td>
                    <td>{s.email}</td>
                    <td>{s.year}</td>
                    <td>{s.department}</td>
                    <td>{s.course}</td>
                    <td>{s.parent_name}</td>
                    <td>{s.parent_phone}</td>
                    <td>
                      <button onClick={() => openModal("students", s)}>Edit</button>
                      <button onClick={() => handleDelete("students", s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSidebar === "faculty" && (
          <section className="admin-section">
            <h2>Faculty</h2>
            <button className="add-btn" onClick={() => openModal("faculty")}>
              Add Faculty
            </button>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Course</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Workload</th>
                  <th>Attendance</th>
                  <th>Leave</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id}>
                    <td>{f.full_name}</td>
                    <td>{f.email}</td>
                    <td>{f.phone}</td>
                    <td>{f.department}</td>
                    <td>{f.course}</td>
                    <td>{f.designation}</td>
                    <td>{f.salary}</td>
                    <td>{f.workload}</td>
                    <td>{f.attendance}</td>
                    <td>{f.leave}</td>
                    <td>{f.experience}</td>
                    <td>
                      <button onClick={() => openModal("faculty", f)}>Edit</button>
                      <button onClick={() => handleDelete("faculty", f.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h3>{selectedItem ? "Edit" : "Add"} {modalType === "students" ? "Student" : "Faculty"}</h3>

              <div className="tabs">
                {(modalType === "students" ? STUDENT_TABS : FACULTY_TABS).map((tab, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={activeTab === idx ? "active" : ""}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Student Modal */}
              {modalType === "students" && (
                <>
                  {activeTab === 0 && (
                    <>
                      <input name="name" placeholder="Full Name" defaultValue={selectedItem?.name || ""} required />
                      <input name="roll_no" placeholder="Roll Number" defaultValue={selectedItem?.roll_no || ""} required />
                      <input name="branch" placeholder="Branch" defaultValue={selectedItem?.branch || ""} />
                      <input name="email" type="email" placeholder="Email" defaultValue={selectedItem?.email || ""} />
                      <input name="dob" type="date" defaultValue={selectedItem?.dob || ""} />
                      <input name="hostel" placeholder="Hostel" defaultValue={selectedItem?.hostel || ""} />
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <input name="year" type="number" placeholder="Year" defaultValue={selectedItem?.year || ""} />
                      <input name="result" placeholder="Result" defaultValue={selectedItem?.result || ""} />

                      <select
                        value={selectedDept}
                        onChange={(e) => {
                          setSelectedDept(e.target.value);
                          setSelectedCourse("");
                        }}
                        required
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>

                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        disabled={!selectedDept}
                        required
                      >
                        <option value="">Select Course</option>
                        {selectedDept && COURSES[selectedDept]?.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {activeTab === 2 && (
                    <>
                      <input name="parent_name" placeholder="Parent Name" defaultValue={selectedItem?.parent_name || ""} />
                      <input name="parent_phone" placeholder="Parent Phone" defaultValue={selectedItem?.parent_phone || ""} />
                    </>
                  )}
                </>
              )}

              {/* Faculty Modal */}
              {modalType === "faculty" && (
                <>
                  {activeTab === 0 && (
                    <>
                      <input name="full_name" placeholder="Full Name" defaultValue={selectedItem?.full_name || ""} required />
                      <input name="email" type="email" placeholder="Email" defaultValue={selectedItem?.email || ""} />
                      <input name="phone" placeholder="Phone" defaultValue={selectedItem?.phone || ""} />
                      <input name="designation" placeholder="Designation" defaultValue={selectedItem?.designation || ""} />
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <input name="salary" type="number" placeholder="Salary" defaultValue={selectedItem?.salary || ""} />
                      <input name="workload" placeholder="Workload" defaultValue={selectedItem?.workload || ""} />

                      <select
                        value={selectedDept}
                        onChange={(e) => {
                          setSelectedDept(e.target.value);
                          setSelectedCourse("");
                        }}
                        required
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>

                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        disabled={!selectedDept}
                        required
                      >
                        <option value="">Select Course</option>
                        {selectedDept && COURSES[selectedDept]?.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {activeTab === 2 && (
                    <>
                      <input name="attendance" type="number" placeholder="Attendance %" defaultValue={selectedItem?.attendance || ""} />
                      <input name="leave" type="number" placeholder="Leave Count" defaultValue={selectedItem?.leave || ""} />
                    </>
                  )}

                  {activeTab === 3 && (
                    <>
                      <input name="experience" type="number" placeholder="Years of Experience" defaultValue={selectedItem?.experience || ""} />
                    </>
                  )}
                </>
              )}

              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
