import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.jpg"

function Header() {
  return (
    <>
        <header className="bg-emerald-200">
            <a href="/">
                <img width={200} src={Logo} alt="Logo da página" className="mx-auto" />
            </a>
            <nav className="bg-emerald-200 text-center p-5">  
                <Link 
                    to="/criar-usuario" 
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                    Usuarios
                </Link>
            </nav> 
        </header>
    </>
  );
}

export default Header;
