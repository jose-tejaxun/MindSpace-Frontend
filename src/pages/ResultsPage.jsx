import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTest, submitTest, fetchResults } from "../utils/api";

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchResults();
        setResults(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading results", err);
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Cargando resultados...</p>;
  if (!results) return <p>Error cargando los resultados.</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Resultados del Test</h2>

      <div style={{ marginTop: "20px" }}>
        <h4>Trastornos detectados:</h4>
        {results.disorders?.length > 0 ? (
          <ul>
            {results.disorders.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        ) : (
          <p>Ningún trastorno detectado</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Tipo de personalidad MBTI:</h4>
        <p>{results.mbti_type || "No calculado"}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Tests completados:</h4>
        <ul>
          {results.completed_tests?.map((t, i) => (
            <li key={i}>{t}</li>
          )) || <p>Ninguno</p>}
        </ul>
      </div>

      <button
        style={{ marginTop: "30px" }}
        onClick={() => navigate("/user/dashboard")}
      >
        Volver al dashboard
      </button>
    </div>
  );
};

export default ResultsPage;
