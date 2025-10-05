import React from "react";

const QuestionCard = ({question ,selectedAnswer,  onSelect }) => {
  return (
    <div className="card">
      <h2>{question.text}</h2>

      <ul className="options">

        {question.options.map((option, index) => (
          <li key={index}>

            <label className="option-label">
              <input
                type="radio"
                name={question.id}
                value={index}
                checked={selectedAnswer === index}
                onChange={() => onSelect(index)}
                />
              {option}
            </label>
          </li>
        ))}

      </ul>
    </div>


  );
};

export default QuestionCard;

//background: linear-gradient(135deg, #c4c9c2, #587cc4);
 