import { clientList } from "../data/clients";
import ClientCard from "../components/ClientCard";
import "./Dashboard.css";

function Dashboard({username}){
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

    return(
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="dashboard-nav">
                    <span className="nav-item">Home</span>
                    <span className="nav-item active" >POC</span>
                </div>
                <div className="dashboard-welcome">
                    <p>Welcome, {username}</p>
                    <p className="dashboard-time">
                        {formattedDate} {formattedTime}
                    </p>
                </div>
            </header>
            <main className="client-grid">
                {clientList.map((client)=>( 
                    <ClientCard key={client.id} client={client}/>
                    ))}
            </main>
        </div>
    );
}

export default Dashboard;