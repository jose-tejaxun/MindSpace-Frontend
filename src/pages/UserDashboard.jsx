import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTest } from "../utils/api";

export default function UserDashboard() {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTests = async () => {
      try {
        const diagnostic = await fetchTest("diagnostic");
        const mbti = await fetchTest("mbti");
        setTests([diagnostic, mbti]);
      } catch (err) {
        console.error("Error al cargar los tests:", err);
        setError("No se pudieron cargar los tests. Intenta nuevamente.");
      }
    };
    loadTests();
  }, []);

  const handleStart = (type) => {
    navigate(`/test/${type}`);
  };

  const handleChat = () => {
    navigate("/chat");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center w-100">
          <h3>Bienvenido al Dashboard de Usuario</h3>
          <p>Aquí podrás realizar tus tests y acceder al asesor.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Test Diagnóstico</h5>
                  <p className="card-text flex-grow-1">
                    Completa este test para conocer tus posibles desórdenes mentales.
                  </p>
                  <button className="btn btn-primary mt-3" onClick={() => handleStart("diagnostic")}>
                    Iniciar Test
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Test de Personalidad</h5>
                  <p className="card-text flex-grow-1">
                    Realiza este test para conocer tu tipo de personalidad según el modelo MBTI.
                  </p>
                  <button className="btn btn-primary mt-3" onClick={() => handleStart("mbti")}>
                    Iniciar Test
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Asesor Virtual</h5>
                  <p className="card-text flex-grow-1">
                    Habla con nuestro asesor virtual para resolver dudas o inquietudes.
                  </p>
                  <button className="btn btn-success mt-3" onClick={handleChat}>
                    Iniciar Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
