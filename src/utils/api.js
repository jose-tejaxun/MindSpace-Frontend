// src/utils/api.js
import { TESTS } from "../data/tests";

export const fetchTest = async (type) => {
  return new Promise((resolve, reject) => {
    const test = TESTS[type];
    if (test) resolve(test);
    else reject("Tipo de test no encontrado");
  });
};

export async function submitTest({ test_id, answers }) {
  localStorage.setItem(`result_${test_id}`, JSON.stringify(answers));
  return { message: "Guardado localmente" };
}

export async function fetchResults() {
  const diagnostic = JSON.parse(localStorage.getItem("result_diagnostic") || "{}");
  const mbti = JSON.parse(localStorage.getItem("result_mbti") || "{}");
  return {
    diagnostic,
    mbti,
  };
}