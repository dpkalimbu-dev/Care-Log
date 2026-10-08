import { useNavigate } from "react-router-dom";
import "./AppHeader.css";

function AppHeader({ activeTab, children }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-brand">
          <div className="app-brand-icon">
            <i className="bi bi-clipboard-heart-fill"></i>
          </div>
          <span className="app-brand-name">Daily care log</span>
        </div>
        <nav className="app-nav">
          <span
            className={activeTab === "home" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/home")}
          >
            Home
          </span>
          <span
            className={activeTab === "poc" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/")}
          >
            POC
          </span>
        </nav>
      </div>
      {children && <div className="app-header-right">{children}</div>}
    </header>
  );
}

export default AppHeader;