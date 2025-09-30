import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Payment.css";

const Payment = () => {
  const merchant = {
    name: "My ERP Pvt Ltd",
    upi: "myerp@upi",
    account: "1234567890",
    ifsc: "SBIN0001234",
  };

  const [payments, setPayments] = useState([
    { id: 1, invoice: "#INV001", customer: "Rohan Singh", amount: 1200, status: "Paid", method: "UPI", date: "2025-09-01", due: "2025-09-10" },
    { id: 2, invoice: "#INV002", customer: "Rohan Boddh", amount: 850, status: "Pending", method: "Credit Card", date: "2025-09-05", due: "2025-09-15" },
    { id: 3, invoice: "#INV003", customer: "Tazim Kassar", amount: 450, status: "Failed", method: "Bank Transfer", date: "2025-09-07", due: "2025-09-12" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [newPayment, setNewPayment] = useState({
    customer: "",
    amount: "",
    method: "Credit Card",
    due: "",
    cardNumber: "",
    upiId: "",
    accountNumber: "",
    ifsc: "",
  });

  // Handle form inputs
  const handleChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  // Submit new payment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPayment.customer || !newPayment.amount) {
      return alert("⚠ Please fill all required fields!");
    }

    const newEntry = {
      id: payments.length + 1,
      invoice: `#INV00${payments.length + 1}`,
      customer: newPayment.customer,
      amount: parseFloat(newPayment.amount),
      status: "Paid",
      method: newPayment.method,
      date: new Date().toISOString().slice(0, 10),
      due: newPayment.due || "—",
    };

    setPayments([newEntry, ...payments]);
    alert(`✅ Payment Successful!\nAmount: ₹${newPayment.amount}\nMethod: ${newPayment.method}`);
    setNewPayment({
      customer: "",
      amount: "",
      method: "Credit Card",
      due: "",
      cardNumber: "",
      upiId: "",
      accountNumber: "",
      ifsc: "",
    });
  };

  // Generate invoice PDF
  const downloadInvoice = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice Receipt", 14, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${payment.invoice}`, 14, 40);
    doc.text(`Customer: ${payment.customer}`, 14, 50);
    doc.text(`Amount: ₹${payment.amount}`, 14, 60);
    doc.text(`Status: ${payment.status}`, 14, 70);
    doc.text(`Payment Method: ${payment.method}`, 14, 80);
    doc.text(`Date: ${payment.date}`, 14, 90);

    doc.autoTable({
      startY: 110,
      head: [["Item", "Amount"]],
      body: [["Service/Order", `₹${payment.amount}`]],
    });

    doc.save(`${payment.invoice}.pdf`);
  };

  // Stats
  const totalPaid = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const totalFailed = payments.filter(p => p.status === "Failed").reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter(
    (p) =>
      p.status === "Pending" &&
      p.due &&
      p.due !== "—" &&
      new Date(p.due) < new Date()
  );

  // Filter + Search
  const filteredPayments = payments.filter(p =>
    (filter === "All" || p.status === filter) &&
    (p.customer.toLowerCase().includes(search.toLowerCase()) || p.invoice.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="payment-page">
      <div className="payment-content">
        <h2 className="page-title">💳 Payment Dashboard</h2>

        {/* Merchant Info */}
        <div className="merchant-box">
          <h4>Account Details</h4>
          <p style={{ color: "black" }}><b>Company:</b> {merchant.name}</p>
          <p style={{ color: "black" }}><b>UPI ID:</b> {merchant.upi}</p>
          <p style={{ color: "black" }}><b>Bank A/c:</b> {merchant.account} ({merchant.ifsc})</p>


        </div>

        {/* Stats Cards */}
        <div className="payment-cards">
          <div className="p-card green"><h4>Total Paid</h4><p>₹ {totalPaid}</p></div>
          <div className="p-card blue"><h4>Pending</h4><p>₹ {totalPending}</p></div>
          <div className="p-card red"><h4>Failed</h4><p>₹ {totalFailed}</p></div>
          <div className="p-card orange"><h4>Overdue</h4><p>{overdue.length} Invoices</p></div>
        </div>

        {/* Add Payment Form */}
        <div className="payment-form">
          <h3>New Payment</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="customer" placeholder="Customer Name" value={newPayment.customer} onChange={handleChange} />
            <input type="number" name="amount" placeholder="Amount (₹)" value={newPayment.amount} onChange={handleChange} />

            <select name="method" value={newPayment.method} onChange={handleChange}>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </select>

            {/* Conditional Inputs */}
            {(newPayment.method === "Credit Card" || newPayment.method === "Debit Card") && (
              <input type="text" name="cardNumber" placeholder="Card Number" value={newPayment.cardNumber} onChange={handleChange} />
            )}
            {newPayment.method === "UPI" && (
              <input type="text" name="upiId" placeholder="Enter your UPI ID" value={newPayment.upiId} onChange={handleChange} />
            )}
            {newPayment.method === "Bank Transfer" && (
              <>
                <input type="text" name="accountNumber" placeholder="Your Account No." value={newPayment.accountNumber} onChange={handleChange} />
                <input type="text" name="ifsc" placeholder="IFSC Code" value={newPayment.ifsc} onChange={handleChange} />
              </>
            )}

            <input type="date" name="due" value={newPayment.due} onChange={handleChange} />
            <button type="submit">💰 Pay Now</button>
          </form>
        </div>

        {/* Filters */}
        <div className="payment-filters">
          <input type="text" placeholder="🔍 Search by customer or invoice" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Payment Table */}
        <div className="payment-table">
          <h3>Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                <th>Date</th>
                <th>Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td>{p.invoice}</td>
                  <td>{p.customer}</td>
                  <td>₹ {p.amount}</td>
                  <td><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p.method}</td>
                  <td>{p.date}</td>
                  <td>{p.due}</td>
                  <td><button className="download-btn" onClick={() => downloadInvoice(p)}>⬇ Invoice</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Overdue Reminder */}
        {overdue.length > 0 && (
          <div className="overdue-box">
            ⚠ {overdue.length} payments are overdue. Please follow up!
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
