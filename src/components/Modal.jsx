// src/components/Modal.jsx
export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}
