import React ,{Fragment} from  'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom"
import Button from '@mui/material/Button';
import Dashboard from './Dashboard';

function App() {
  return (
    
    <Dashboard>
    <Route path="/dashboard" element={<Dashboard />} />
    </Dashboard>
    
  );
}

export default App;
