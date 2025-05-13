import React from "react";

const QuestionBlock = ({ question, onChange, selected }) => {
    const handleSelect = (value) => {
        onChange(question.id, value);
    };

    const renderOptions = () => {
        // Si es string simple: ["yes", "no"]
        if (typeof question.options[0] === "string") {
            return question.options.map((opt, idx) => (
                <label key={idx} style={{ display: "block", margin: "5px 0" }}>
                    <input
                        type="radio"
                        name={question.id}
                        value={opt}
                        checked={selected === opt}
                        onChange={() => handleSelect(opt)}
                    />
                    {" "}{opt}
                </label>
            ));
        }

        // Si es objeto: [{ label: "text", value: "E" }]
        return question.options.map((opt, idx) => (
            <label key={idx} style={{ display: "block", margin: "5px 0" }}>
                <input
                    type="radio"
                    name={question.id}
                    value={opt.value}
                    checked={selected === opt.value}
                    onChange={() => handleSelect(opt.value)}
                />
                {" "}{opt.label}
            </label>
        ));
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h4>{question.text}</h4>
            {renderOptions()}
        </div>
    );
};

export default QuestionBlock;
