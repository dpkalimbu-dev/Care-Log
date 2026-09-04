import { useState } from 'react';
import Login from "./pages/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if(!currentUser){
    return <Login onLoginSuccess={(username) => setCurrentUser(username)}/>;
  }

  return(
    <div style={{padding: "2rem", fontFamily: "sans-serif", color: "white"}}>
    <p>Logged in as {currentUser}</p>
    </div>
  );
}


export default App;
