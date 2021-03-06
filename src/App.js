import React from "react";
import Questions from "./components/Questions";

export default function App() {
  const [triviaData, setTriviaData] = React.useState([]);

  const [checkAnswers, setCheckAnswers] = React.useState(false);

  const [newGame, setNewGame] = React.useState(false);

  const [startGame, setStartGame] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setTriviaData(
          data.results.map((item) => ({
            question: item.question,
            correct_answer: item.correct_answer,
            incorrect_answers: [...item.incorrect_answers],
            shuffled_answers: shuffleArray([
              ...item.incorrect_answers,
              item.correct_answer,
            ]),
            selected_answer: "",
          }))
        )
      );
  }, [newGame]);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function selectAnswer(option, questionIndex) {
    setTriviaData((prevTriviaData) => {
      return (
        (prevTriviaData[questionIndex].selected_answer = option),
        [...prevTriviaData]
      );
    });
  }

  function submitAnswers() {
    setCheckAnswers(!checkAnswers);
  }

  function getScore() {
    const correctAnswers = triviaData.filter(
      (item) => item.selected_answer === item.correct_answer
    );
    return correctAnswers.length;
  }

  function playAgain() {
    setNewGame(!newGame);
    setCheckAnswers(!checkAnswers);
  }

  const checkAnswersButton = (
    <button className="submit-button" onClick={submitAnswers}>
      Check answers
    </button>
  );

  const newGameButton = (
    <button className="submit-button" onClick={playAgain}>
      Play again
    </button>
  );

  return (
    <main>
      {startGame && (
        <div className="questions-page">
          <Questions
            triviaData={triviaData}
            checkAnswers={checkAnswers}
            selectAnswer={selectAnswer}
          />
          <div className="questions-bottom">
            {checkAnswers && (
              <h2 className="score">
                You scored {getScore()}/5 correct answers
              </h2>
            )}
            {checkAnswers ? newGameButton : checkAnswersButton}
          </div>
        </div>
      )}
      {!startGame && (
        <div className="start-page">
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button onClick={() => setStartGame(!startGame)}>Start quiz</button>
        </div>
      )}
      <section className="background-shapes">
        <svg
          className="yellow-blob"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFAD1"
            d="M41.9,-37.7C51.4,-21.5,54.2,-4.2,51.2,12.7C48.1,29.7,39.2,46.4,23.2,57.8C7.1,69.3,-16.1,75.6,-31.3,67.4C-46.6,59.2,-53.7,36.5,-59.9,12.7C-66.1,-11.1,-71.3,-36,-61.1,-52.3C-51,-68.7,-25.5,-76.3,-4.6,-72.6C16.2,-68.9,32.4,-53.8,41.9,-37.7Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="blue-blob"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#DEEBF8"
            d="M52.1,-59.9C59.8,-44.5,52.9,-22.2,52.4,-0.5C51.9,21.2,57.7,42.3,50,56.2C42.3,70.1,21.2,76.8,2.7,74C-15.7,71.3,-31.5,59.3,-42,45.4C-52.6,31.5,-57.9,15.7,-56,1.9C-54.1,-11.9,-44.9,-23.8,-34.4,-39.3C-23.8,-54.7,-11.9,-73.7,5.2,-78.8C22.2,-84,44.5,-75.3,52.1,-59.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </section>
    </main>
  );
}
