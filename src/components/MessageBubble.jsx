export default function MessageBubble({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-bubble" style={{ whiteSpace: "pre-line" }}>
        {text}
      </div>
    </div>
  );
}
