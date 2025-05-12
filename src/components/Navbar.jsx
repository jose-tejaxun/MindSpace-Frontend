import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">MindSpace</span>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to={role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Perfil</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light ms-2" onClick={logout}>Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
