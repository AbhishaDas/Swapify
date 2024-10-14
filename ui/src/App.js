import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      </Routes>
      
     </Router>
    </div>
  );
}

export default App;
