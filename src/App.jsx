import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CriarUsuario from "./pages/UsuarioPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-usuario" element={<CriarUsuario />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
