// src/pages/Support.jsx
import React, { useState } from "react";
import "./Support.css";

const initialTickets = [
  { id: 1, requester: "HelpDesk", email: "support@helpdesk.com", subject: "Learn how to solve tickets effectively", status: "Open", priority: "High", date: "2025-09-01", agent: "Anna Smart" },
  { id: 2, requester: "HelpDesk", email: "support@helpdesk.com", subject: "Welcome to HelpDesk! Here’s your next step", status: "Open", priority: "Medium", date: "2025-09-01", agent: "Anna Smart" },
  { id: 3, requester: "Nomi Naamana", email: "nomi.naamana@yahoo.com", subject: "Hair dryer not responding", status: "Open", priority: "High", date: "2025-09-05", agent: "Anna Smart" },
  { id: 4, requester: "Christabel Hi", email: "christabel.hi@hotmail.com", subject: "Meal breaking down", status: "Closed", priority: "High", date: "2025-09-07", agent: "Anna Smart" },
];

export default function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTickets = tickets.filter(
    (t) =>
      (statusFilter === "All" || t.status === statusFilter) &&
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const [newTicket, setNewTicket] = useState({ requester: "", email: "", subject: "", priority: "Low", agent: "Support Team" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.requester) return;
    const ticket = { ...newTicket, id: tickets.length + 1, status: "Open", date: new Date().toISOString().slice(0, 10) };
    setTickets([ticket, ...tickets]);
    setNewTicket({ requester: "", email: "", subject: "", priority: "Low", agent: "Support Team" });
  };

  const updateStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="support-page">
      {/* Sidebar */}
      <aside className="support-sidebar">
        <h2>Tickets</h2>
        <button className="new-ticket-btn" onClick={() => document.getElementById("ticketForm").scrollIntoView({ behavior: "smooth" })}>
          + New Ticket
        </button>
        <input type="text" placeholder="Search in all tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="ticket-statuses">
          <p onClick={() => setStatusFilter("All")}>All tickets</p>
          <p onClick={() => setStatusFilter("Open")}>Open</p>
          <p onClick={() => setStatusFilter("Closed")}>Closed</p>
          <p onClick={() => setStatusFilter("Solved")}>Solved</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="support-main">
        <h1>All Tickets</h1>

        {/* Ticket Form */}
        <div id="ticketForm" className="ticket-form-container">
          <h2>Raise a Ticket</h2>
          <form className="ticket-form" onSubmit={handleSubmit}>
            <input type="text" name="requester" placeholder="Requester Name" value={newTicket.requester} onChange={(e) => setNewTicket({ ...newTicket, requester: e.target.value })} />
            <input type="email" name="email" placeholder="Requester Email" value={newTicket.email} onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })} />
            <input type="text" name="subject" placeholder="Subject" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} />
            <select name="priority" value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit">Add Ticket</button>
          </form>
        </div>

        {/* Tickets Table */}
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Requester</th>
              <th>Subject</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.requester}</td>
                <td>{t.subject}</td>
                <td>{t.agent}</td>
                <td>
                  <span className={`status-badge ${t.status.toLowerCase().replace(" ", "-")}`}>{t.status}</span>
                </td>
                <td>
                  <span className={`priority-badge ${t.priority.toLowerCase()}`}>{t.priority}</span>
                </td>
                <td>{t.date}</td>
                <td>
                  {t.status !== "Closed" && (
                    <>
                      <button onClick={() => updateStatus(t.id, "Solved")}>Solve</button>
                      <button onClick={() => updateStatus(t.id, "Closed")}>Close</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
