import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
    const [summary, setSummary] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Obtener resumen de conteos
        fetch(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(setSummary);

        // Obtener lista de usuarios
        fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setUsers(data.users || []));
    }, []);

    const handleDownload = () => {
        window.open(`${process.env.REACT_APP_API_URL}/admin/users/report`, '_blank');
    };

    const calculateAge = (birthDateStr) => {
        const birth = new Date(birthDateStr);
        const now = new Date();
        const age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        return m < 0 || (m === 0 && now.getDate() < birth.getDate()) ? age - 1 : age;
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3 className="mb-4">Dashboard de Administrador</h3>

                {/* Cards */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <div className="card text-bg-primary shadow">
                            <div className="card-body text-center">
                                <h5>Usuarios tipo USER</h5>
                                <h2>{summary?.total_users || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card text-bg-success shadow">
                            <div className="card-body text-center">
                                <h5>Test diagnóstico realizados</h5>
                                <h2>{summary?.diagnostic_count || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card text-bg-warning shadow">
                            <div className="card-body text-center">
                                <h5>Test personalidad realizados</h5>
                                <h2>{summary?.personality_count || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de usuarios */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Lista de usuarios</h5>
                    <button className="btn btn-outline-success" onClick={handleDownload}>
                        Descargar reporte Excel
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>Edad</th>
                                <th>Sexo</th>
                                <th>Desórdenes mentales</th>
                                <th>Big Five</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{calculateAge(u.birth_date)}</td>
                                    <td>{u.sex}</td>
                                    <td>
                                        {u.disorders.length > 0 ? (
                                            <ul className="list-unstyled">
                                                {u.disorders.map((d, i) => <li key={i}>{d}</li>)}
                                            </ul>
                                        ) : (
                                            <em>Sin desórdenes</em>
                                        )}
                                    </td>
                                    <td>
                                        <ul className="list-unstyled">
                                            {Object.entries(u.big_five).map(([trait, value]) => (
                                                <li key={trait}>{trait}: {value}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr><td colSpan="5">No hay usuarios disponibles</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
