import { useState } from "react";
import { categoryQuestions } from "../data/categoryQuestions";
import "./LogEntryForm.css";

function LogEntryForm({ category, client, currentUser, onSave, onCancel }) {
  const questions = categoryQuestions[category];
  const [answers, setAnswers] = useState({});

  function handleAnswer(questionIndex, value) {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  }

  function shouldShowQuestion(q, index) {
    if (!q.showIf) return true;
    const requiredAnswer = answers[q.showIf.questionIndex];
    return requiredAnswer === q.showIf.equals;
  }

  function handleSave() {
    const parts = questions
      .map((q, index) => answers[index])
      .filter((answer) => answer !== undefined && answer !== "");

    const value = parts.join(", ");

    const newEntry = {
      id: Date.now(),
      clientId: client.id,
      staffUsername: currentUser,
      timestamp: new Date().toISOString(),
      category: category,
      value: value,
    };

    onSave(newEntry);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">{category}</p>
        <p className="modal-subtitle">{client.name}</p>

        {questions.map((q, index) => {
          if (!shouldShowQuestion(q, index)) return null;

          return (
            <div className="modal-question" key={index}>
              <p className="question-text">{q.question}</p>

              {q.type === "number" && (
                <input
                  type="number"
                  min="0"
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswer(index, e.target.value)}
                />
              )}

              {q.type === "text" && (
                <textarea
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswer(index, e.target.value)}
                />
              )}

              {q.options && (
                <div className="option-buttons">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={
                        answers[index] === option ? "option-btn selected" : "option-btn"
                      }
                      onClick={() => handleAnswer(index, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogEntryForm;