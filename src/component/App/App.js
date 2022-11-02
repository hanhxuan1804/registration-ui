import './App.css';

import RegisterForm from '../RegisterForm/RegisterForm';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>
          <h1>Home</h1>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </div>} />
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
