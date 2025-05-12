import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Dashboard de Administrador</h3>
        <p>Aquí podrás ver estadísticas y generar reportes.</p>
      </div>
    </>
  );
}
