import React, { useState } from 'react';
import { fetchQuizQuestions } from './FetchQuestions';
import { QuestionsState } from './FetchQuestions';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [userInput,setUserInput] = useState('');

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS
    );
    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setLoading(false);
  };

  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const checkUserInput = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(userInput===questions[number].correct_answer) {
      alert("Correct")
      setScore(score+1)
    } else {
      alert("Wrong")
    }
    setUserInput("");
    setNumber(number+1);
  }

  return (
    <>
        <h1>QUIZ</h1>
        <button className='start' onClick={startQuiz}>
          Start
        </button>
        {number===10 ? <p>Game Over</p> : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && number<10 && (
          <div>
            {questions[number].question}
            <input type='text' name='userInput' value={userInput} onChange={handleUserInputChange}></input>
            <button onClick={checkUserInput}>Submit</button>
          </div>
        )}
    </>
  );
};

export default App;