import React from 'react';
import {Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!token) return null;

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/user/dashboard" className="text-gray-800 dark:text-gray-200">Dashboard</Link>
        <Link to="/profile" className="text-gray-800 dark:text-gray-200">Perfil</Link>
      </div>
      <button onClick={handleLogout} className="text-red-500">Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;
