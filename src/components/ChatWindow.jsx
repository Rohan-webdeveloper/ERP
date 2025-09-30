import { useState } from "react";
import { supabase } from "../pages/supabaseClient"; 
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Please enter your Roll No. (e.g., 235/ucs/108)" },
  ]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // user ka message add karo
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // ✅ Roll number validate karo
    const rollNo = text.trim();

    try {
      // Supabase se fetch
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("roll_no", rollNo)
        .single();

      if (error || !data) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Student not found. Please try again." },
        ]);
        return;
      }

      // ✅ Agar data mil gaya
      const reply = `
📌 Student Profile  
━━━━━━━━━━━━━━━  
👤 Name: ${data.full_name || "N/A"}  
🆔 Roll No: ${data.roll_no}  
🏫 Branch: ${data.branch || "N/A"}  
📅 Year: ${data.year || "N/A"}  
🏠 Hostel: ${data.hostel || "N/A"}  
🎓 GPA: ${data.gpa || "N/A"}  
📊 Attendance: ${data.attendance_percentage || 0}%  
💰 Fee Status: ${data.fee_status || "N/A"}  
      `;

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error fetching student data." },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
}
