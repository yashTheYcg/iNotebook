import { useState } from 'react';
import './App.css';
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { About } from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} /> 
          <Route exact path='/about' element={<About showAlert={showAlert} />}/>
          <Route exact path='/login' element={<Login showAlert={showAlert} />} />
          <Route exact path='/signup' element={<Signup showAlert={showAlert} />} /> 
        </Routes>
      </BrowserRouter>
    </>   
  );
}

export default App;

