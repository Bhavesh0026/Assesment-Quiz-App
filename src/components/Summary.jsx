import React from "react";

const Summary = ({ questions, userAnswers }) => {
  return (
    <div className="summary">

      <h2>Quiz Summary</h2>

      {questions.map((q, i) => {
        
        const userAnswerIndex = userAnswers[q.id];
        const isCorrect = userAnswerIndex === q.correctAnswerIndex;
        return (

          <div key={q.id} className={`summary-item ${isCorrect ? "correct" : "incorrect"}`}>

            <p><strong>Q{i + 1}:</strong> {q.text}</p>

            <p>Your Answer: {q.options[userAnswerIndex] || "Not Answered"}</p>

            <p>Correct Answer: {q.options[q.correctAnswerIndex]}</p>

            <p>Status: {isCorrect ? "✅ Correct ." : "❌ Incorrect ."}</p>


          </div>
        );
      })}
            <button
                 onClick={() => {
                localStorage.clear()
                window.location.reload()}}
                >  Retake Quiz
            </button>
    </div>
  );
};

export default Summary;
