import { useParams, useNavigate } from "react-router-dom";
import { clientList } from "../data/clients";
import CategoryCard from "../components/CategoryCard";
import "./ClientDetail.css";

const categories = [
  "Food Intake",
  "Fluid Intake",
  "Bowel Movement",
  "Transfer",
  "General Note",
];

function ClientDetail({ logEntries, onAddEntry, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = clientList.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Client not found.</p>
      </div>
    );
  }

  const clientEntries = logEntries.filter(
    (entry) => entry.clientId === client.id
  );

  function handleCategoryClick(category) {
    console.log("Clicked:", category);
  }

  return (
    <div className="client-detail-page">
      <p className="back-link" onClick={() => navigate("/")}>
        &larr; Back to Dashboard
      </p>

      <div className="client-header">
        <div className="client-header-avatar">
          {client.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <p className="client-header-name">{client.name}</p>
          <p className="client-header-meta">
            Unit {client.unit} &middot; {client.status}
          </p>
        </div>
      </div>

      <p className="section-label">PRESS A CATEGORY TO DOCUMENT</p>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <p className="section-label">TODAY'S ENTRIES</p>
      <div className="entries-list">
        {clientEntries.length === 0 ? (
          <p className="empty-message">No entries logged yet.</p>
        ) : (
          clientEntries.map((entry) => (
            <div className="entry-row" key={entry.id}>
              <span>{entry.category}</span>
              <span>{entry.value}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientDetail;