import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTest, submitTest } from "../utils/api";

const QUESTIONS_PER_PAGE = 5;

const TestPage = () => {
    const { testType } = useParams();
    const navigate = useNavigate();

    const [test, setTest] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTest = async () => {
            try {
                const data = await fetchTest(testType);
                setTest(data);
                const saved = localStorage.getItem(`progress_${testType}`);
                if (saved) setAnswers(JSON.parse(saved));
            } catch (err) {
                console.error("Error al cargar test:", err);
            } finally {
                setLoading(false);
            }
        };
        loadTest();
    }, [testType]);

    useEffect(() => {
        if (test) {
            localStorage.setItem(`progress_${testType}`, JSON.stringify(answers));
        }
    }, [answers, test, testType]);

    if (loading) return <p className="text-center mt-10">Cargando test...</p>;
    if (!test) return <p className="text-center mt-10">No se pudo cargar el test.</p>;

    const totalPages = Math.ceil(test.questions.length / QUESTIONS_PER_PAGE);
    const currentQuestions = test.questions.slice(
        currentPage * QUESTIONS_PER_PAGE,
        (currentPage + 1) * QUESTIONS_PER_PAGE
    );

    const handleAnswer = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const allAnswered = currentQuestions.every((q) => answers[q.id]);

    const handleNext = async () => {
        if (currentPage + 1 < totalPages) {
            setCurrentPage((prev) => prev + 1);
        } else {
            try {
                await submitTest({ test_id: testType, answers: Object.entries(answers).map(([id, answer]) => ({ id, answer })) });
                localStorage.removeItem(`progress_${testType}`);
                navigate("/results");
            } catch (err) {
                alert("Error al enviar el test");
            }
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const saveProgress = () => {
        localStorage.setItem(`progress_${testType}`, JSON.stringify(answers));
        alert("Progreso guardado");
    };

    const progressPercent = Math.floor((Object.keys(answers).length / test.questions.length) * 100);

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-2">{test.title}</h2>
                <p className="text-center text-gray-600 mb-6">{test.description}</p>

                {/* Progreso */}
                <div className="w-full bg-gray-300 rounded-full h-3 mb-8">
                    <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <div className="space-y-8">
                    {currentQuestions.map((q, index) => (
                        <div key={q.id} className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm">
                            <h4 className="text-lg font-semibold mb-3">
                                {index + 1 + currentPage * QUESTIONS_PER_PAGE}. {q.text}
                            </h4>
                            <div className="flex gap-4 flex-wrap">
                                {q.options.map((opt, i) => {
                                    const value = typeof opt === "string" ? opt : opt.value;
                                    const label = typeof opt === "string" ? opt : opt.label;
                                    const selected = answers[q.id] === value;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(q.id, value)}
                                            className={`px-6 py-2 rounded-full transition text-sm font-medium ${selected
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
                    >
                        ← Anterior
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={saveProgress}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Guardar progreso
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!allAnswered}
                            className={`px-4 py-2 rounded ${allAnswered
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-400 text-white cursor-not-allowed"
                                }`}
                        >
                            {currentPage + 1 === totalPages ? "Finalizar" : "Siguiente →"}
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/user/dashboard")}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Volver al dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
