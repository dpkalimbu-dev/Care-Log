import { useParams } from "react-router-dom";

function ClientDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <p>Client Detail page for client id: {id}</p>
    </div>
  );
}

export default ClientDetail;