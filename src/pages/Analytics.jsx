import { useEffect, useState } from "react";
import "./Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        netSales: 2500,
        ticketsSold: 2,
        ticketsTotal: 40,
        addOnsSold: 0,
        pageViews: 200000,
        eventStats: [
          { month: "Jan", Website: 100000, Ticketmaster: 120000, Eventbrite: 90000 },
          { month: "Feb", Website: 150000, Ticketmaster: 140000, Eventbrite: 100000 },
          { month: "Mar", Website: 200000, Ticketmaster: 160000, Eventbrite: 120000 },
        ],
        profitTrend: [
          { month: "Jan", profit: 200000 },
          { month: "Feb", profit: 250000 },
          { month: "Mar", profit: 300000 },
          { month: "Apr", profit: 280000 },
          { month: "May", profit: 320000 },
          { month: "Jun", profit: 400000 },
        ],
      });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;

  // Calculate total events per month for summary cards
  const eventTotals = stats.eventStats.map(event => ({
    month: event.month,
    total: event.Website + event.Ticketmaster + event.Eventbrite,
  }));

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">📊 Analytics Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <p className="value">${stats.netSales.toLocaleString()}</p>
          <p className="label">Net Sales</p>
        </div>
        <div className="stat-card blue">
          <p className="value">{stats.ticketsSold}/{stats.ticketsTotal}</p>
          <p className="label">Tickets Sold</p>
        </div>
        <div className="stat-card pink">
          <p className="value">{stats.addOnsSold}/{stats.ticketsTotal}</p>
          <p className="label">Add-ons Sold</p>
        </div>
        <div className="stat-card violet">
          <p className="value">${(stats.pageViews / 1000).toLocaleString()}K</p>
          <p className="label">Page Views</p>
        </div>
      </div>

      {/* Event Statistics Summary Cards */}
      <h2>Event Statistics Summary</h2>
      <div className="stats-grid">
        {eventTotals.map(event => (
          <div className="stat-card green" key={event.month}>
            <p className="value">{event.total.toLocaleString()}</p>
            <p className="label">{event.month} Total Attendees</p>
          </div>
        ))}
      </div>

      {/* Event Statistics Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Event Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.eventStats}>
              <CartesianGrid stroke="#2c2c54" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: "#1e1e2f", border: "none" }} />
              <Line type="monotone" dataKey="Website" stroke="#00f5d4" strokeWidth={3} />
              <Line type="monotone" dataKey="Ticketmaster" stroke="#9f6cff" strokeWidth={3} />
              <Line type="monotone" dataKey="Eventbrite" stroke="#ffe66d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Profit Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.profitTrend}>
              <CartesianGrid stroke="#2c2c54" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: "#1e1e2f", border: "none" }} />
              <Line type="monotone" dataKey="profit" stroke="#ff6b6b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
