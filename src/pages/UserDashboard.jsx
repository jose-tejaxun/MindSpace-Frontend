import Navbar from '../components/Navbar';

export default function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Bienvenido al Dashboard de Usuario</h3>
        <p>Desde aquí podrás hacer tus tests y acceder al asesor.</p>
      </div>
    </>
  );
}
