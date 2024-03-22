import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/LoginSignup/Signup';
import Login from './components/LoginSignup/Login';
import TaskList from './components/Task/TaskList';
import Dashboard from './components/Dashboard';
import AddTask from './components/Task/AddTask';
import EditTask from './components/Task/EditTask';
import { useState } from 'react';

import {Routes,Route} from 'react-router-dom'

function App() {
  
  const [loggedin, setLoggedin] = useState(!!window.localStorage.getItem("isLoggedIn")); // Initialize loggedin state
  return (
    <div className="App">
        {loggedin && <Navbar />}
     <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={loggedin ? <Dashboard /> : <Login onLogin={() => setLoggedin(true)} />} />
      <Route path="/login" element={<Login onLogin={() => setLoggedin(true)} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task/:type" element={<TaskList />} />
      <Route path="/addtask" element={<AddTask />} />
      <Route path="/edittask/:id" element={<EditTask />} />

     </Routes>
    </div>
  );
}

export default App;
