export const TESTS = {
    diagnostic: {
        type: "diagnostic",
        title: "Test de diagnóstico de salud mental",
        description: "Responde estas preguntas para detectar posibles síntomas de ansiedad, depresión, TDAH, estrés o burnout.",
        questions: Array.from({ length: 50 }, (_, i) => {
            let category = "";
            let text = "";

            if (i < 10) {
                category = "anxiety";
                text = `Pregunta ${i + 1}: ¿Te sientes ansioso frecuentemente?`;
            } else if (i < 20) {
                category = "depression";
                text = `Pregunta ${i + 1}: ¿Te falta motivación incluso en cosas que solías disfrutar?`;
            } else if (i < 30) {
                category = "adhd";
                text = `Pregunta ${i + 1}: ¿Te resulta difícil concentrarte en tareas cotidianas?`;
            } else if (i < 40) {
                category = "stress";
                text = `Pregunta ${i + 1}: ¿Sientes que tienes demasiadas responsabilidades que no puedes manejar?`;
            } else {
                category = "burnout";
                text = `Pregunta ${i + 1}: ¿Te sientes física o emocionalmente agotado últimamente?`;
            }

            return {
                id: `q${i + 1}`,
                text,
                options: ["yes", "no"],
                correct_answer: category
            };
        })
    },

    mbti: {
        type: "mbti",
        title: "Test de Personalidad MBTI",
        description: "Descubre tu tipo de personalidad respondiendo estas 50 preguntas.",
        questions: (() => {
            const build = (startIndex, questions, axis) =>
                questions.map(([label1, value1, label2, value2], i) => ({
                    id: `${axis}_${startIndex + i}`,
                    text: `Pregunta ${startIndex + i}:`,
                    options: [
                        { label: label1, value: value1 },
                        { label: label2, value: value2 }
                    ]
                }));


            const ei = build(1, [
                ["Prefiero estar con otras personas", "E", "Prefiero estar solo", "I"],
                ["Me energiza socializar", "E", "Recargo energía estando solo", "I"],
                ["Me siento cómodo en grupos grandes", "E", "Prefiero reuniones pequeñas", "I"],
                ["Hablo fácilmente con extraños", "E", "Soy más reservado", "I"],
                ["Tiendo a pensar en voz alta", "E", "Pienso primero y luego hablo", "I"],
                ["Prefiero hacer cosas nuevas con otros", "E", "Prefiero hacerlo por mi cuenta", "I"],
                ["Disfruto fiestas y reuniones", "E", "Prefiero tiempo tranquilo", "I"],
                ["Me gusta participar activamente", "E", "Prefiero observar primero", "I"],
                ["Actúo espontáneamente", "E", "Analizo antes de actuar", "I"],
                ["Socializar me activa", "E", "Socializar me cansa", "I"],
                ["Hablo mucho en reuniones", "E", "Prefiero escuchar", "I"],
                ["Expreso mis ideas al instante", "E", "Prefiero pensar antes de compartir", "I"]
            ], "ei");

            const sn = build(13, [
                ["Me centro en hechos concretos", "S", "Me centro en ideas abstractas", "N"],
                ["Prefiero instrucciones claras", "S", "Prefiero explorar libremente", "N"],
                ["Sigo rutinas conocidas", "S", "Exploro nuevas posibilidades", "N"],
                ["Confío en lo comprobado", "S", "Confío en mi intuición", "N"],
                ["Me fijo en los detalles", "S", "Veo el panorama general", "N"],
                ["Aprendo con ejemplos reales", "S", "Aprendo imaginando", "N"],
                ["Soy práctico", "S", "Soy idealista", "N"],
                ["Confío en la experiencia", "S", "Confío en la visión", "N"],
                ["Me enfoco en el presente", "S", "Me enfoco en el futuro", "N"],
                ["Prefiero certezas", "S", "Acepto lo ambiguo", "N"],
                ["Hago planes paso a paso", "S", "Pienso en grandes conceptos", "N"],
                ["Prefiero lo conocido", "S", "Me gusta lo desconocido", "N"]
            ], "sn");

            const tf = build(25, [
                ["Tomo decisiones lógicas", "T", "Tomo decisiones emocionales", "F"],
                ["Valoro la justicia", "T", "Valoro la empatía", "F"],
                ["Digo lo que pienso", "T", "Considero cómo se sentirá el otro", "F"],
                ["Debato por convicción", "T", "Evito discusiones", "F"],
                ["Soy directo", "T", "Soy diplomático", "F"],
                ["Analizo objetivamente", "T", "Considero sentimientos", "F"],
                ["Corrijo para mejorar", "T", "Aliento para apoyar", "F"],
                ["Busco eficiencia", "T", "Busco armonía", "F"],
                ["Critico constructivamente", "T", "Evito herir", "F"],
                ["Priorizo principios", "T", "Priorizo personas", "F"],
                ["Evalúo por resultados", "T", "Evalúo por intención", "F"],
                ["Prefiero precisión", "T", "Prefiero comprensión", "F"]
            ], "tf");

            const jp = build(37, [
                ["Me gusta tener planes", "J", "Prefiero ir con el flujo", "P"],
                ["Hago listas", "J", "Actúo espontáneamente", "P"],
                ["Prefiero estructura", "J", "Prefiero flexibilidad", "P"],
                ["Sigo horarios", "J", "Improviso", "P"],
                ["Cierro decisiones rápido", "J", "Dejo opciones abiertas", "P"],
                ["Planeo con antelación", "J", "Actúo según surja", "P"],
                ["Prefiero rutina", "J", "Me aburro con rutina", "P"],
                ["Me incomoda la incertidumbre", "J", "Me estimula lo incierto", "P"],
                ["Me gusta terminar tareas", "J", "Me entusiasma comenzarlas", "P"],
                ["Sigo reglas", "J", "Adapto las reglas", "P"],
                ["Organizo mi día", "J", "Improviso mi día", "P"],
                ["Evito cambios repentinos", "J", "Me adapto a los cambios", "P"]
            ], "jp");

            return [...ei, ...sn, ...tf, ...jp];
        })()
    }
};