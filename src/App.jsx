import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import ClientDetail from './pages/ClientDetail';
import ClientCard from './components/ClientCard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if(!currentUser){
    return <Login onLoginSuccess={(username) => setCurrentUser(username)}/>;
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard username={currentUser}/>}/>
      <Route path='/clients/:id' element={ClientDetail}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
