import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', birth_date: '', sex: 'male', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token } = await register(form);
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', payload.role);
      localStorage.setItem('userId', payload.sub);
      navigate(payload.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Nombre" onChange={handleChange} required />
        <input name="birth_date" type="date" className="form-control mb-2" onChange={handleChange} required />
        <select name="sex" className="form-control mb-2" onChange={handleChange}>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <input name="email" type="email" className="form-control mb-2" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mb-2" placeholder="Contraseña" onChange={handleChange} required />
        <button className="btn btn-success w-100" type="submit">Registrarse</button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}
