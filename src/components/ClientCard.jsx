import { useNavigate } from "react-router-dom";
import "./ClientCard.css";

const colors = ["#4A7CB5", "#C97A4A", "#0b8a3e", "#c7329a", "#B5544A", "#d71c1c"];

function getInitials(name) {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || " ";
  const last = parts[parts.length - 1]?.[0] || " ";
  return (first + last).toUpperCase();
}

function getColor(name) {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total += name.charCodeAt(i);
  }
  const index = total % colors.length;
  return colors[index];
}

function ClientCard({ client, documented }) {
  const navigate = useNavigate();

  return (
    <div
      className={documented ? "client-card documented" : "client-card not-documented"}
      onClick={() => navigate(`/clients/${client.id}`)}
    >
      <div className="client-avatar" style={{ backgroundColor: getColor(client.name) }}>
        {getInitials(client.name)}
      </div>
      <p className="client-name">{client.name}</p>
      <p className="client-unit">Unit {client.unit}</p>
    </div>
  );
}

export default ClientCard;