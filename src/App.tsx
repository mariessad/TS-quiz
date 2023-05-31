import React from 'react';
import QuestionCard from './components/QuestionCard';


function App() {

  const startQuiz = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }


  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className='start-button' onClick={startQuiz}/>
      <p className='score'>Score:</p>
      <p>Loading Questions ...</p>
      <QuestionCard/>
      <button className='next-button' onClick={nextQuestion}>Next</button>
    </div>
  );
}

export default App;
