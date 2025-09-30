// src/pages/Admissions.jsx
import React from "react";
import "./Admissions.css";

export default function Admissions() {
  // Dummy "backend" data
  const admissionProcess = [
    "Check program eligibility requirements.",
    "Fill the online application form with personal and academic details.",
    "Upload required documents: transcripts, ID, passport-size photo.",
    "Pay application fee securely via online payment gateway.",
    "Attend interview or entrance test if applicable.",
    "Receive admission confirmation via email and dashboard notification.",
  ];

  const eligibility = [
    "Undergraduate: 60%+ in 10+2 (PCM/PCB/Commerce depending on program).",
    "Postgraduate: 55%+ in relevant UG degree.",
    "PhD: PG degree with 60%+, valid research proposal, and reference letters.",
  ];

  const importantDates = [
    { event: "Application Start Date", date: "01-Oct-2025" },
    { event: "Application End Date", date: "31-Dec-2025" },
    { event: "Entrance Test / Interview", date: "15-Jan-2026" },
    { event: "Admission Result", date: "01-Feb-2026" },
    { event: "Commencement of Classes", date: "01-Mar-2026" },
  ];

  const feeStructure = [
    { program: "B.Tech", fee: "₹1,50,000 per year" },
    { program: "M.Tech", fee: "₹1,80,000 per year" },
    { program: "MBA", fee: "₹2,00,000 per year" },
    { program: "PhD", fee: "₹1,20,000 per year" },
  ];

  const scholarships = [
    "Merit-based: Up to 50% tuition fee waiver.",
    "Need-based: Based on financial assessment.",
    "Sports & Cultural: For outstanding performers.",
    "Government Scholarships: As per state/central schemes.",
  ];

  const faqs = [
    {
      question: "Can I apply for multiple programs?",
      answer: "Yes, submit separate applications for each program online.",
    },
    {
      question: "What documents are required?",
      answer:
        "Transcripts, ID proof, passport-size photo, entrance exam scorecard (if applicable), and program-specific documents.",
    },
    {
      question: "Is there an application fee?",
      answer:
        "Yes, ₹1,000 for UG programs and ₹1,500 for PG programs.",
    },
    {
      question: "Is hostel accommodation available?",
      answer:
        "Yes, we provide on-campus hostels with Wi-Fi, mess, and 24/7 security.",
    },
    {
      question: "Do you admit international students?",
      answer:
        "Yes, with equivalent qualifications, passport, visa, and English proficiency (IELTS/TOEFL).",
    },
  ];

  return (
    <div className="admissions-container">
      <h1>Admissions Portal</h1>

      {/* Admission Process */}
      <section className="admissions-section">
        <h2>Admission Process</h2>
        <ul>
          {admissionProcess.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </section>

      {/* Eligibility */}
      <section className="admissions-section">
        <h2>Eligibility Criteria</h2>
        <ul>
          {eligibility.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </section>

      {/* Online Application Form */}
      <section className="admissions-section">
        <h2>Apply Online</h2>
        <p>
          Start your application by filling our <a href="/apply" className="button">online application form</a>.
        </p>
      </section>

      {/* Important Dates */}
      <section className="admissions-section">
        <h2>Important Dates</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {importantDates.map((d, idx) => (
              <tr key={idx}>
                <td>{d.event}</td>
                <td>{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Fee Structure & Scholarships */}
      <section className="admissions-section">
        <h2>Fee Structure & Scholarships</h2>
        <h3>Fee Structure</h3>
        <ul>
          {feeStructure.map((f, idx) => (
            <li key={idx}>{f.program} - {f.fee}</li>
          ))}
        </ul>
        <h3>Scholarships</h3>
        <ul>
          {scholarships.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </section>

      {/* FAQs */}
      <section className="admissions-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="admissions-section">
        <h2>Contact Admissions Office</h2>
        <p>Email: admissions@university.edu</p>
        <p>Helpline: +91-9876543210 (Mon-Fri, 9 AM - 6 PM)</p>
        <p>Address: Admissions Office, Main Campus, New Delhi, India</p>
      </section>
    </div>
  );
}
