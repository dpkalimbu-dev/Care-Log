import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientDetail from "./pages/ClientDetail";
import { seedLogEntries } from "./data/logEntries";


function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("careLogCurrentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [logEntries, setLogEntries] = useState(() => {
    const saved = localStorage.getItem("careLogEntries");
    return saved ? JSON.parse(saved) : seedLogEntries;
  });

  useEffect(() => {
    localStorage.setItem("careLogCurrentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("careLogEntries", JSON.stringify(logEntries));
  }, [logEntries]);

  function handleLogout() {
  setCurrentUser(null);
}

  function addLogEntry(newEntry) {
    setLogEntries((prevEntries) => [...prevEntries, newEntry]);
  }

  function updateLogEntry(id, updatedFields){
    setLogEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? {...entry, ...updatedFields} : entry
      )
    );
  }

  function markEntryCorrected(id){
    setLogEntries((prevEntries) =>
      prevEntries.map((entry) =>
      entry.id === id ? {...entry, corrected: true } : entry
      )
    );
  }

  if (!currentUser) {
    return <Login onLoginSuccess={(username) => setCurrentUser(username)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard username={currentUser} onLogout={handleLogout}/>} />
        <Route
          path="/clients/:id"
          element={
            <ClientDetail
              logEntries={logEntries}
              onAddEntry={addLogEntry}
              onUpdateEntry={updateLogEntry}
              onCorrectEntry={markEntryCorrected}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;