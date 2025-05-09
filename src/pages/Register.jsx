import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', birth_date: '', sex: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      localStorage.setItem('role', payload.role);
      localStorage.setItem('userId', payload.sub);
      setMessage(`Bienvenido, ${form.name}`);
      setTimeout(() => {
        if (payload.role === 'USER') navigate('/user/dashboard');
        else if (payload.role === 'ADMIN') navigate('/admin/dashboard');
      }, 1000);
    } else {
      setMessage('Error al registrarse');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Registrarse</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input className="w-full p-2 border" name="birth_date" type="date" value={form.birth_date} onChange={handleChange} required />
        <select className="w-full p-2 border" name="sex" value={form.sex} onChange={handleChange} required>
          <option value="">Selecciona sexo</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <input className="w-full p-2 border" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="w-full p-2 border" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button className="w-full p-2 bg-green-500 text-white" type="submit">Crear cuenta</button>
      </form>
      <p className="mt-4 text-center text-sm">¿Ya tienes cuenta? <Link to="/" className="text-blue-500">Inicia sesión</Link></p>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
}

export default Register;
