// src/components/HostelPage.jsx
import React, { useState } from "react";
import { supabase } from "../pages/supabaseClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./HostelPage.css";

const HOSTELS = [
  { id: 1, name: "Tagore Hostel", floors: 3, roomsPerFloor: 5, mess: "North Mess" },
  { id: 2, name: "Gandhi Hostel", floors: 2, roomsPerFloor: 4, mess: "South Mess" },
  { id: 3, name: "Vivekananda Hostel", floors: 4, roomsPerFloor: 6, mess: "Central Mess" },
];

export default function HostelPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // STEP 1 → Form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    setFormData(data);
    setStep(2);
  };

  // STEP 4 → Save allotment + PDF
  const handleAllot = async () => {
    const allotment = {
      student_name: formData.name,
      roll_no: formData.roll_no,
      email: formData.email,
      year: formData.year,
      department: formData.department || formData.branch,
      course: formData.course || "",
      parent_name: formData.parent_name,
      parent_phone: formData.parent_phone,
      aadhar_no: formData.aadhar_no,
      fees_receipt_no: formData.fees_receipt_no,
      hostel_name: selectedHostel.name,
      floor_number: parseInt(selectedRoom.split("-")[0].replace("F", "")),
      room_number: selectedRoom,
      mess_name: selectedHostel.mess,
    };

    // Insert into Supabase → hostels table
    const { error } = await supabase.from("hostels").insert([allotment]);
    if (error) {
      alert("Allotment failed: " + error.message);
      return;
    }

    // Generate PDF
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("🏫 Hostel Allotment Receipt", 65, 20);
      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30);

      // Student & Allotment Details
      autoTable(doc, {
        startY: 40,
        head: [["Field", "Details"]],
        body: [
          ["Student Name", allotment.student_name],
          ["Roll Number", allotment.roll_no],
          ["Email", allotment.email],
          ["Department", allotment.department],
          ["Course", allotment.course],
          ["Year", allotment.year],
          ["Parent Name", allotment.parent_name],
          ["Parent Phone", allotment.parent_phone],
          ["Aadhar No", allotment.aadhar_no],
          ["Fees Receipt No", allotment.fees_receipt_no || "N/A"],
          ["Hostel", allotment.hostel_name],
          ["Floor", allotment.floor_number],
          ["Room", allotment.room_number],
          ["Mess", allotment.mess_name],
        ],
        theme: "grid",
        headStyles: { fillColor: [44, 62, 80] },
        bodyStyles: { textColor: 20 },
      });

      // Rules Section
      let y = doc.lastAutoTable.finalY + 20;
      doc.setFontSize(14);
      doc.text("📌 Hostel Rules & Regulations:", 20, y);

      doc.setFontSize(11);
      const rules = [
        "1. Students must maintain discipline inside the hostel premises.",
        "2. Hostel rooms should be kept neat and clean at all times.",
        "3. Entry and exit timings must be strictly followed.",
        "4. Visitors are only allowed during designated hours.",
        "5. Damage to hostel property will be fined accordingly.",
        "6. Loud music and parties are strictly prohibited.",
        "7. Mess timings must be followed without exception.",
        "8. Ragging is strictly prohibited and punishable by law.",
        "9. Any misconduct may result in cancellation of hostel allotment.",
        "10. Students must carry their Hostel ID at all times.",
      ];

      rules.forEach((rule, index) => {
        y += 7;
        doc.text(rule, 20, y);
      });

      // Signature
      doc.text("Authorized Signatory", 150, y + 20);

      // Save PDF
      doc.save("Hostel_Allotment.pdf");
      alert("✅ Hostel Allotted & Receipt Downloaded!");
    } catch (err) {
      console.error("PDF Error:", err);
      alert("❌ PDF generation failed!");
    }
  };

  return (
    <div className="hostel-page">
      <h2>🏠 Hostel Allotment</h2>

      {/* STEP 1: Student Form */}
      {step === 1 && (
        <form className="student-form" onSubmit={handleFormSubmit}>
          <input name="name" placeholder="Full Name" required />
          <input name="roll_no" placeholder="Roll Number" required />
          <input name="email" type="email" placeholder="Email" />
          <input name="department" placeholder="Department" />
          <input name="course" placeholder="Course" />
          <input name="year" type="number" placeholder="Year" />
          <input name="parent_name" placeholder="Parent Name" />
          <input name="parent_phone" placeholder="Parent Phone" />
          <input name="aadhar_no" placeholder="Aadhar Number" />
          <input name="fees_receipt_no" placeholder="Fees Receipt No. / Upload Ref" />
          <button type="submit">Next → Hostel Selection</button>
        </form>
      )}

      {/* STEP 2: Hostel List */}
      {step === 2 && (
        <div className="hostel-list">
          <h3>Select a Hostel</h3>
          <div className="hostel-cards">
            {HOSTELS.map((h) => (
              <div
                key={h.id}
                className={`hostel-card ${selectedHostel?.id === h.id ? "selected" : ""}`}
                onClick={() => setSelectedHostel(h)}
              >
                <h4>{h.name}</h4>
                <p>Floors: {h.floors}</p>
                <p>Mess: {h.mess}</p>
              </div>
            ))}
          </div>
          {selectedHostel && (
            <button onClick={() => setStep(3)}>Next → Select Room</button>
          )}
        </div>
      )}

      {/* STEP 3: Floor & Rooms */}
      {step === 3 && selectedHostel && (
        <div className="room-selection">
          <h3>Select Room in {selectedHostel.name}</h3>
          {[...Array(selectedHostel.floors)].map((_, floor) => (
            <div key={floor} className="floor">
              <h4>Floor {floor + 1}</h4>
              <div className="rooms">
                {[...Array(selectedHostel.roomsPerFloor)].map((_, room) => {
                  const roomNo = `F${floor + 1}-R${room + 1}`;
                  return (
                    <div
                      key={roomNo}
                      className={`room-bubble ${selectedRoom === roomNo ? "selected" : ""}`}
                      onClick={() => setSelectedRoom(roomNo)}
                    >
                      {roomNo}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {selectedRoom && (
            <button onClick={() => setStep(4)}>Next → Mess & Confirm</button>
          )}
        </div>
      )}

      {/* STEP 4: Confirm & Allot */}
      {step === 4 && (
        <div className="confirm-allot">
          <h3>Confirm Allotment</h3>
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Hostel:</b> {selectedHostel.name}</p>
          <p><b>Room:</b> {selectedRoom}</p>
          <p><b>Mess:</b> {selectedHostel.mess}</p>
          <button onClick={handleAllot}>Allot & Download PDF</button>
        </div>
      )}
    </div>
  );
}
