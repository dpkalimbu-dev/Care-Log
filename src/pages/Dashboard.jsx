import { useState } from "react";
import { clientList } from "../data/clients";
import ClientCard from "../components/ClientCard";
import AppHeader from "../components/AppHeader";
import { isToday } from "../utils/isToday";
import "./Dashboard.css";

function Dashboard({ username, onLogout, logEntries }) {
  const [searchText, setSearchText] = useState("");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const clientsWithEntryToday = new Set(
    logEntries
      .filter((entry) => !entry.corrected && isToday(entry.timestamp))
      .map((entry) => entry.clientId)
  );

  const filteredClients = clientList.filter((client) =>
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <AppHeader activeTab="poc">
        <p>Welcome, {username}</p>
        <p className="dashboard-time">
          {formattedDate} {formattedTime}
        </p>
        <button className="logout-btn" onClick={onLogout}>
          Log out
        </button>
      </AppHeader>

      <div className="dashboard-content">
        <div className="dashboard-toolbar">
          <p className="section-label">ALL CLIENTS &middot; {filteredClients.length}</p>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>

        <main className="client-grid">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              documented={clientsWithEntryToday.has(client.id)}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;