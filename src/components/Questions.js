import React from "react";
import Button from "./Button";

export default function Questions(props) {
  const questionElements = props.triviaData.map((item, i) => {
    return (
      <div key={i} className="trivia-card">
        <h2 className="question">{item.question}</h2>
        <div className="answer-buttons">
          {item.shuffled_answers.map((option, j) => (
            <Button
              option={option}
              selectAnswer={props.selectAnswer}
              questionIndex={i}
              key={j}
              isSelected={item.selected_answer === option}
              isCorrect={item.correct_answer === option}
              checkAnswers={props.checkAnswers}
            />
          ))}
        </div>
        <hr></hr>
      </div>
    );
  });

  return <div>{questionElements}</div>;
}
