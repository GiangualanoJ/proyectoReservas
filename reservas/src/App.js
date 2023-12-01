import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase/config/firebase";
import Navbar from './componentes/navbar';
import Presentacion from './componentes/presentación';
import LoginPage from './firebase/componenetes/login';
import Salones from './componentes/Listadodesalones';
import Reservas from './componentes/reservas';
import DemoApp from './componentes/calendar';
import Detalles from './componentes/detalleDeUsuario';
import DetalleCliente from './componentes/detalle2';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/presentación' element={<Presentacion />}></Route>
          <Route path='/salones' element={<ProtectedRoute>
            <Salones />
          </ProtectedRoute>}>
          </Route>
          <Route path='/reservas' element={<ProtectedRoute>
            <Reservas />
          </ProtectedRoute>}>
          </Route>
          <Route path='/calendar' element={<ProtectedRoute>
            <DemoApp />
          </ProtectedRoute>}>
          </Route>
          <Route path='/detalleDeUsuario' element={<ProtectedRoute>
            <Detalles />
          </ProtectedRoute>}>
          </Route>
          <Route path='/detalle2' element={<ProtectedRoute>
            <DetalleCliente />
          </ProtectedRoute>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


const ProtectedRoute = ({ redirectPath = "/", children }) => {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken")
    if (token) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate(redirectPath)
        }
      })
    } else {
      navigate(redirectPath)
    }
  }, [])

  return children
}

export default App;
