import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error('Error al cargar el perfil:', err);
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <p className="text-center mt-5">Cargando perfil...</p>;

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                    <h3 className="text-center mb-3">Mi Perfil</h3>

                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Fecha de nacimiento:</strong> {new Date(user.birth_date).toLocaleDateString()}</p>
                    <p><strong>Sexo:</strong> {user.sex}</p>

                    <hr />
                    <h5 className="text-center">Características de personalidad</h5>
                    <table className="table table-striped table-bordered mt-3">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Rasgo</th>
                                <th>Puntaje (0–100)</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {Object.entries(user.big_five).map(([trait, value]) => (
                                <tr key={trait}>
                                    <td>{trait.charAt(0).toUpperCase() + trait.slice(1)}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {user.disorders.length > 0 && (
                        <>
                            <hr />
                            <h5 className="text-center mt-3">Desórdenes detectados</h5>
                            <ul>
                                {user.disorders.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
