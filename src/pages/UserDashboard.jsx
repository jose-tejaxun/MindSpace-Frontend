import Navbar from '../components/Navbar';

export default function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="text-center">
          <h3>Bienvenido al Dashboard de Usuario</h3>
          <p>Aquí podrás realizar tus tests y acceder al asesor.</p>
        </div>
      </div>
    </>
  );
}