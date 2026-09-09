import { useParams } from "react-router-dom";

function ClientDetail({logEntries, onAddEntry, currentUser}) {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <p>Client Detail page for client id: {id}</p>
      <p>Logged in as: {currentUser}</p>
      <p>Total log entries in system: {logEntries.length}</p>
    </div>
  );
}

export default ClientDetail;