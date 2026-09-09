import { useNavigate } from "react-router-dom";
import "./ClientCard.css";

const colors = ["#4A7CB5", "#C97A4A", "#5FA37A", "#A15FA3", "#B5544A", "#647075", "#a7d822", "#4AA8A0", "#8A5FC9", "#C94A7A"];

function getInitials(name){
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || " ";
    const last = parts[parts.length - 1]?.[0] || " ";
    return (first + last).toUpperCase();
}

function getColor(name){
    let total = 0;
    for(let i = 0; i < name.length; i++){
        total += name.charCodeAt(i);
    }
    const index = total % colors.length;
    return colors[index];
}

function ClientCard({client}){
    const navigate = useNavigate();

    return (
        <div className="client-card" onClick={() =>navigate (`/clients/${client.id}`)}>
            <div
            className="client-avatar"
            style={{backgroundColor: getColor(client.name)}}
            >
                {getInitials(client.name)}
            </div>
            <p className="client-name">{client.name}</p>
            <p className="client-unit">Unit {client.unit}</p>
        </div>
    );
};

export default ClientCard;