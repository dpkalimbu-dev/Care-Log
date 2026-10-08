import { clientList } from "../data/clients";
import { announcements } from "../data/announcements";
import { schedule } from "../data/schedule";
import { isToday } from "../utils/isToday";
import AppHeader from "../components/AppHeader";
import "./Home.css";

function Home({ logEntries, username, onLogout }) {
  const activeClients = clientList.filter((c) => c.status === "active");

  const entriesToday = logEntries.filter(
    (entry) => !entry.corrected && isToday(entry.timestamp)
  );

  const clientsWithEntryToday = new Set(
    entriesToday.map((entry) => entry.clientId)
  );

  const pendingClients = activeClients.filter(
    (client) => !clientsWithEntryToday.has(client.id)
  );

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

  return (
    <div className="home-page">
      <AppHeader activeTab="home">
        <p>Welcome, {username}</p>
        <p className="dashboard-time">
          {formattedDate} {formattedTime}
        </p>
        <button className="logout-btn" onClick={onLogout}>
          Log out
        </button>
      </AppHeader>

      <div className="home-content">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon stat-icon-clients">
              <i className="bi bi-people-fill"></i>
            </div>
            <p className="stat-number">{activeClients.length}</p>
            <p className="stat-label">Active clients</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-entries">
              <i className="bi bi-clipboard2-check-fill"></i>
            </div>
            <p className="stat-number">{entriesToday.length}</p>
            <p className="stat-label">Entries logged today</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-pending">
              <i className="bi bi-clock-history"></i>
            </div>
            <p className="stat-number">{pendingClients.length}</p>
            <p className="stat-label">Pending documentation</p>
          </div>
        </div>

        <p className="section-label">TODAY'S SCHEDULE</p>
        <div className="list-card">
          {schedule.length === 0 ? (
            <p className="empty-message">Nothing scheduled today.</p>
          ) : (
            schedule.map((item) => {
              const client = clientList.find((c) => c.id === item.clientId);
              return (
                <div className="schedule-row" key={item.id}>
                  <i className="bi bi-clock schedule-icon"></i>
                  <span className="schedule-time">{item.time}</span>
                  <span className="schedule-client">{client?.name}</span>
                  <span className="schedule-desc">{item.description}</span>
                </div>
              );
            })
          )}
        </div>

        <p className="section-label">STAFF NOTICES</p>
        <div className="list-card">
          {announcements.map((note) => (
            <div className="notice-row" key={note.id}>
              <i className="bi bi-bell-fill notice-icon"></i>
              <span>{note.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;