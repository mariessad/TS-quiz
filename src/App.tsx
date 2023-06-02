import React, { useState } from "react";
// components
import { fetchQuizQuestions, Question } from "./API";
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionState, Difficulty } from "./API";

// create type for the answerobject
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  // add <any[]> to avoid a ts error - 'property does not exist on type "never"'
  // Updated to pass <QuestionState[]> from API file
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  // function to start game, click the start button to trigger API fetch
  // could add a try/catch block in here to handle errors
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);

    // reset score to zero
    setScore(0);
    // set user answers to empty array
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quiz</h1>
      {/* ternary to display start button if game over or on the last question */}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start-button" onClick={startQuiz} > Start </button>): null}
      {/* only show the score if we are not in gameover */}
      {!gameOver ? <p className="score">Score:</p>: null}
      {/* only show loading when actually loading questions */}
      {loading ? <p>Loading Questions ...</p> : null }
      
      <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      <button className="next-button" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
}

export default App;
