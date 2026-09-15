import { clientList } from "../data/clients";
import AppHeader from "../components/AppHeader";
import ClientCard from "../components/ClientCard";
import "./Dashboard.css";

function Dashboard({username, onLogout}){
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const formattedTime  = today.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

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

    <main className="client-grid">
      {clientList.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </main>
  </div>
);
}

export default Dashboard;