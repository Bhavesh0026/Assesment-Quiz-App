import { useState, useEffect } from "react";
import { questions } from "./Data/Question"
import "./index.css";

import QuestionCard from "./components/QuestionCard"
import NavigationButtons from "./components/NavigationButtons"
import Summary from "./components/Summary";

function App() {

  
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("quizAnswers")) || {}
  });


  const [currentIndex, setCurrentIndex] = useState(() => {
    return JSON.parse(localStorage.getItem("currentIndex")) || 0
  })

  const [isCompleted, setIsCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem("quizCompleted")) || false
  })

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex))
    localStorage.setItem("quizCompleted", JSON.stringify(isCompleted))
  }, [answers, currentIndex, isCompleted]);


  const currentQuestion = questions[currentIndex]

  const handleSelect = (answerIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }))
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) setIsCompleted(true)
    else setCurrentIndex((prev) => prev + 1)
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1)
  }



  if (isCompleted) {
    return <Summary questions={questions} userAnswers={answers} />
  }

  return (
    <div className="App">
      <h1>React Quiz App</h1>

      <QuestionCard
        key={currentIndex}
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        disableNext={answers[currentQuestion.id] === undefined}
        current={currentIndex}
        total={questions.length}
      />
    </div>
    
  );
}

export default App;
