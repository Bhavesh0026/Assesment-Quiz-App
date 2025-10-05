import React from "react";

const NavigationButtons = ({ onPrev,onNext, disableNext,current , total }) => {

  return (
    <div className="nav-buttons">

      <button onClick={onPrev} disabled={current === 0}> Previous </button>

      <button onClick={onNext} disabled={disableNext}>
        {current === total - 1 ? "Finish" : "Next"}

      </button>

      <p>Question {current + 1} of {total}</p>
    </div>


  );
};

export default NavigationButtons;
