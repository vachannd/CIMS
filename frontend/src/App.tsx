import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';

function MyButton() {
  return (<button>Click me</button>);
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <main className="form-signin w-100 m-auto">
          
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
            <MyButton />
      
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
