import  { useState, useEffect } from "react";
import { questions } from "./Data/Question"

import "./index.css";
import QuestionCard from "./components/QuestionCard"
import NavigationButtons  from "./components/NavigationButtons";
import Summary from "./components/Summary"

function App() {

  const [currentIndex , setCurrentIndex] = useState(0)
    const [ answers , setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false)

  // Load saved answers from localStorage when the component mounts
  useEffect(() => {
  const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));
  if (savedAnswers) setAnswers(savedAnswers);

  const savedIndex = JSON.parse(localStorage.getItem("currentIndex"));
  if (savedIndex) setCurrentIndex(savedIndex);

  const savedCompleted = JSON.parse(localStorage.getItem("quizCompleted"));
  if (savedCompleted) setIsCompleted(savedCompleted);
}, []);


  // whenever Answer change Update to local
  useEffect(() => {
  localStorage.setItem("quizAnswers", JSON.stringify(answers));
  localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  localStorage.setItem("quizCompleted", JSON.stringify(isCompleted));
}, [answers, currentIndex, isCompleted]);


  const currentQuestion = questions[currentIndex]

  const handleSelect = (answerIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }))
  }


  const handleNext = () => {
    if (currentIndex === questions.length - 1) setIsCompleted(true);
    else setCurrentIndex((prev) => prev + 1)
  }

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
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onSelect={handleSelect} />


      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        disableNext={answers[currentQuestion.id] === undefined}
        current={currentIndex}
        total={questions.length} />
    </div>
  );
}

export default App;
