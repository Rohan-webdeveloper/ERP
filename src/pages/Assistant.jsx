import { useState, useRef } from "react";
import { supabase } from "../pages/supabaseClient";
import "./Assistant.css";

export default function ERPassistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "👋 Please enter Roll No (student) OR Email (faculty)" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", content: input }]);

    let response = null;

    // 🎓 Check if it's a student roll number
    if (input.includes("/")) {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("roll_no", input.trim())
        .single();

      if (error || !data) {
        response = "❌ Student not found. Please try again.";
      } else {
        response = `
🎓 Student Profile
━━━━━━━━━━━━━━━
🆔 Roll No: ${data.roll_no}
📧 Email: ${data.email || "N/A"}
🏫 Branch: ${data.branch || "N/A"}
📅 Year: ${data.year || "N/A"}
🏠 Hostel: ${data.hostel || "N/A"}
📊 Attendance: ${data.attendance_percentage || "N/A"}%
🎓 GPA: ${data.gpa || "N/A"}
💰 Fee Status: ${data.fee_status || "N/A"}
        `;
      }
    } 
    // 👨‍🏫 Else check if it's faculty email
    else if (input.includes("@")) {
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .eq("email", input.trim())
        .single();

      if (error || !data) {
        response = "❌ Faculty not found. Please try again.";
      } else {
        response = `
👨‍🏫 Faculty Profile
━━━━━━━━━━━━━━━
📛 Name: ${data.name}
📧 Email: ${data.email}
🏫 Department: ${data.department}
🎓 Designation: ${data.designation || "N/A"}
📱 Phone: ${data.phone || "N/A"}
        `;
      }
    } 
    else {
      response = "👉 Please enter Roll No (student) OR Email (faculty)";
    }

    setMessages((prev) => [...prev, { sender: "bot", content: response }]);
    setInput("");
    scrollToBottom();
  };

  return (
    <div className="assistant-container">
      <div className="chat-box">
        <div className="chat-header">ERP Assistant</div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              <div className="message-text" style={{ whiteSpace: "pre-line" }}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Enter Roll No (student) OR Email (faculty)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
