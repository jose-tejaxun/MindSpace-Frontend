import Navbar from '../components/Navbar';

export default function Profile() {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h4>Perfil del usuario</h4>
        <p><strong>ID:</strong> {userId}</p>
        <p><strong>Rol:</strong> {role}</p>
      </div>
    </>
  );
}
