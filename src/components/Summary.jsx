import React, { useEffect, useState } from "react";
import Confetti from "react-confetti"

const Summary = ({ questions, userAnswers }) => {


  const total = questions.length;

  const score = questions.reduce(
    (acc, q) => acc + (userAnswers[q.id] === q.correctAnswerIndex ? 1 : 0),
    0
  )

  const percentage = Math.round((score / total) * 100)

  const [size, setSize] = useState({
    width: window?.innerWidth || 100,
    height: window?.innerHeight || 100,
  })

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, []);

  const handleRestart = () => {
    localStorage.clear();
    window.location.reload()
  };

  return (
    <div className="summary" style={{ maxWidth: 500, margin: "0 auto" }}>
      {percentage >= 50 && (
        <Confetti
          width={size.width}
          height={size.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          wind={-0.03}
        />
      )}

      <h2>🎉 Congratulations on Completing the Quiz 🎉</h2>
      <h2>Summary</h2>

      <div className="score">
        <h3>
          Your Score: {score} / {total} ({percentage}%)
        </h3>
        <div className="progress-bar" aria-hidden="true">
          <div className="progress" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {questions.map((q, i) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`summary-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p>
                <strong>Q{i + 1}:</strong> {q.text}
              </p>
              <p>
                <strong>Your Answer:</strong> {userAnswer !== undefined ? q.options[userAnswer] : "Not Answered"}
              </p>
              <p>
                <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
              </p>
              <p>
                <strong>Status:</strong> {isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, textAlign: "center" }}>
        <button onClick={handleRestart} style={{ padding: "8px 14px", borderRadius: 6 }}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Summary;
