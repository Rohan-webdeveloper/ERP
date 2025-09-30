// src/pages/Academics.jsx
import React from "react";
import "./Academics.css";

export default function Academics() {
  const courses = [
    "B.Tech (CSE, ME, EE, CE)",
    "M.Tech (CSE, ME, EE)",
    "MBA (Finance, Marketing, HR, Analytics)",
    "PhD Programs (Engineering & Management)",
    "Diploma Courses (AI, Robotics, Business Analytics)",
    "Executive Education Programs (Leadership, Strategy)",
  ];

  const departments = [
    {
      name: "Computer Science & Engineering",
      faculty: [
        "Dr. Rohan Singh - AI & ML",
        "Prof. Rohan Boddh - Cybersecurity",
        "Dr. Tazim Kassar - Cloud Computing",
        "Prof. Rudra Pratap Singh - Data Science",
      ],
    },
    {
      name: "Mechanical Engineering",
      faculty: ["Dr. Priya Sharma - Robotics", "Prof. Aditya Verma - Thermal Engineering"],
    },
    {
      name: "Electrical Engineering",
      faculty: ["Dr. Nisha Gupta - Power Systems", "Prof. Rahul Yadav - Electronics"],
    },
    {
      name: "Business Administration",
      faculty: ["Dr. Anjali Rao - Finance", "Prof. Karan Mehta - Marketing"],
    },
    {
      name: "Civil Engineering",
      faculty: ["Dr. Aman Kapoor - Structural", "Prof. Ritu Sharma - Environmental"],
    },
  ];

  const syllabusLinks = [
    {
      course: "B.Tech CSE",
      link: "https://www.bennett.edu.in/wp-content/uploads/2025/03/New-Syllabus-Booklet_BTech-CSE_Global_2025-29.pdf",
    },
    { course: "M.Tech CSE", link: "/syllabus/mtech-cse.pdf" },
    { course: "MBA", link: "/syllabus/mba.pdf" },
    { course: "PhD Programs", link: "/syllabus/phd.pdf" },
  ];

  const academicCalendar = "/calendar/academic-calendar-2025.pdf";

  const researchPublications = [
    "AI in Education - Dr. Rohan Singh",
    "Renewable Energy Research - Dr. Priya Sharma",
    "Business Analytics Trends - Prof. Karan Mehta",
    "Smart Cities Infrastructure - Dr. Aman Kapoor",
    "Cybersecurity Advances - Dr. Tazim Kassar",
  ];

  const onlineResources = [
    { name: "NPTEL", link: "https://nptel.ac.in/" },
    { name: "Coursera", link: "https://www.coursera.org/" },
    { name: "edX", link: "https://www.edx.org/" },
    { name: "MIT OpenCourseWare", link: "https://ocw.mit.edu/" },
    { name: "Khan Academy", link: "https://www.khanacademy.org/" },
  ];

  const placements = [
    "Placed at: Google, Microsoft, Amazon, Infosys, TCS",
    "Highest Package: 45 LPA",
    "Average Package: 12 LPA",
    "Internships with Fortune 500 companies",
  ];

  const scholarships = [
    "Merit-Based Scholarships",
    "Need-Based Financial Aid",
    "Sports Scholarships",
    "Research Fellowships",
  ];

  const studentClubs = [
    "Coding Club",
    "Robotics Society",
    "Entrepreneurship Cell",
    "Debating Club",
    "Cultural Society",
    "Music & Arts Club",
  ];

  const facilities = [
    "Smart Classrooms",
    "Modern Laboratories",
    "Central Library with Digital Resources",
    "Sports Complex & Gym",
    "Hostels with Wi-Fi",
    "Innovation & Incubation Center",
  ];

  const achievements = [
    "Ranked Top 10 in AI Research (2025)",
    "Winners of National Robotics Championship",
    "Best Business School Award 2024",
    "Collaboration with MIT & Stanford for Research",
  ];

  return (
    <div className="academics-container">
      <h1>Academics Portal</h1>

      {/* Courses */}
      <section className="academics-section">
        <h2>Programs Offered</h2>
        <ul>{courses.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </section>

      {/* Departments */}
      <section className="academics-section">
        <h2>Departments & Faculty</h2>
        {departments.map((dept, i) => (
          <div key={i} className="department-box">
            <h3>{dept.name}</h3>
            <ul>{dept.faculty.map((f, j) => <li key={j}>{f}</li>)}</ul>
          </div>
        ))}
      </section>

      {/* Syllabus */}
      <section className="academics-section">
        <h2>Curriculum & Syllabus</h2>
        <ul>
          {syllabusLinks.map((s, i) => (
            <li key={i}><a href={s.link} target="_blank" rel="noopener noreferrer">{s.course} - Download Syllabus</a></li>
          ))}
        </ul>
      </section>

      {/* Academic Calendar */}
      <section className="academics-section">
        <h2>Academic Calendar</h2>
        <a href={academicCalendar} target="_blank" rel="noopener noreferrer" className="button">Download Academic Calendar 2025</a>
      </section>

      {/* Research */}
      <section className="academics-section">
        <h2>Research & Publications</h2>
        <ul>{researchPublications.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </section>

      {/* Online Resources */}
      <section className="academics-section">
        <h2>Online Learning Resources</h2>
        <ul>{onlineResources.map((r, i) => (
          <li key={i}><a href={r.link} target="_blank" rel="noopener noreferrer">{r.name}</a></li>
        ))}</ul>
      </section>

      {/* Placements */}
      <section className="academics-section">
        <h2>Placements & Internships</h2>
        <ul>{placements.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </section>

      {/* Scholarships */}
      <section className="academics-section">
        <h2>Scholarships & Financial Aid</h2>
        <ul>{scholarships.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </section>

      {/* Student Clubs */}
      <section className="academics-section">
        <h2>Student Clubs & Activities</h2>
        <ul>{studentClubs.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </section>

      {/* Facilities */}
      <section className="academics-section">
        <h2>Campus Facilities</h2>
        <ul>{facilities.map((f, i) => <li key={i}>{f}</li>)}</ul>
      </section>

      {/* Achievements */}
      <section className="academics-section">
        <h2>Achievements & Rankings</h2>
        <ul>{achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </section>
    </div>
  );
}
