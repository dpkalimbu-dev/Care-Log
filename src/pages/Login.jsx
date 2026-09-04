import { useState } from "react";
import { staffList} from "../data/staff";
import "./Login.css";

function Login({onLoginSuccess}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        const enteredName = username.trim();
        const enteredPassword = password.trim();

        const matchedUser = staffList.find((staff) =>
           staff.username === enteredName && staff.password === enteredPassword
        );

        if(matchedUser){
            setError("");
            onLoginSuccess(matchedUser.username);
        }else{
            setError("Invalid username, please try again!");
        }
    }

    return (
         <div className="login-page">
      <main className="main">
        <header className="header">
          <i className="bi bi-clipboard-heart-fill"></i>
          <h1 className="title">Daily Care Log</h1>
          <p>Sign in to continue</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="kgurung"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <input type="submit" value="Log in" id="button" />
        </form>

        <p className="demo-hint">Demo login: kgurung/k123</p>
      </main>
    </div>
  );
    
}

export default Login;