import React from "react";

export default function Button(props) {
  const initialStyles = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7Fb",
    border: props.isSelected ? "1px solid #D6DBF5" : "1px solid #4D5B9E",
  };
  const answerStyles = {
    opacity: props.isCorrect ? "1" : "0.5",
    backgroundColor: props.isCorrect
      ? "#94D7A2"
      : props.isSelected && !props.isCorrect
      ? "#F8BCBC"
      : "#F5F7Fb",
    border: props.isCorrect
      ? "1px solid #94D7A2"
      : props.isSelected && !props.isCorrect
      ? "1px solid #F8BCBC"
      : "1px solid #4D5B9E",
  };
  return (
    <button
      key={props.j}
      className="answer-button"
      style={props.checkAnswers ? answerStyles : initialStyles}
      onClick={() => props.selectAnswer(props.option, props.questionIndex)}
    >
      {props.option}
    </button>
  );
}
