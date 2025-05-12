import Navbar from '../components/Navbar';

export default function AdminDashboard() {
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="text-center">
                    <h3>Dashboard de Administrador</h3>
                    <p>Aquí podrás ver estadísticas y generar reportes.</p>
                </div>
            </div>
        </>
    );
}
