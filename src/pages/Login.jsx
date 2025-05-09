import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      // Decodificar token (si quieres obtener nombre y rol rápido)
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      localStorage.setItem('role', payload.role);
      localStorage.setItem('userId', payload.sub);
      setMessage(`Bienvenido, ${email}`);
      setTimeout(() => {
        if (payload.role === 'USER') navigate('/user/dashboard');
        else if (payload.role === 'ADMIN') navigate('/admin/dashboard');
      }, 1000);
    } else {
      setMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full p-2 border" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="w-full p-2 bg-blue-500 text-white" type="submit">Entrar</button>
      </form>
      <p className="mt-4 text-center text-sm">¿No tienes cuenta? <Link to="/register" className="text-blue-500">Crea una</Link></p>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
}

export default Login;
