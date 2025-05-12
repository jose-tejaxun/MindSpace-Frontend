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

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h3>Bienvenido al Dashboard de Usuario</h3>
          <p>Aquí podrás realizar tus tests y acceder al asesor.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row justify-content-center">
          {tests.map((test) => (
            <div className="col-md-4 mb-4" key={test.type}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{test.title}</h5>
                  <p className="card-text flex-grow-1">{test.description}</p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handleStart(test.type)}
                  >
                    Iniciar Test
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}