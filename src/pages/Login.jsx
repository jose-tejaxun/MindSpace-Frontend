import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token } = await login(email, password);
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', payload.role);
      localStorage.setItem('userId', payload.sub);
      if (payload.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/user/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  </div>
);
}
