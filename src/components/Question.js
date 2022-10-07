import React, { useEffect, useRef, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const countRef = useRef(timeRemaining);
  countRef.current = timeRemaining;

  // add useEffect code
  useEffect(() => {
    const timer = setTimeout(() => {
      setInterval(() => {
        if (countRef.current > 1) {
          handleAnswer(false)
        } else {
          setTimeRemaining(countRef.current - 1)
        }
      }, 1000);
    }, 1000);
    return () => {
      clearTimeout(timer)
    };
  }, []);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
