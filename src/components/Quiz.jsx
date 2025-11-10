import React from "react";
import { useState } from "react";
import Results from "./Results";

const Quiz = () => {
  const questionBank = [
    {
      question: "What is the capital of Nigeria?",
      options: ["Abuja", "Lagos", "Oyo", "Kano"],
      answer: "Abuja",
    },
    {
      question: "Which language is used for web apps?",
      options: ["PHP", "Python", "Javascript", "All"],
      answer: "All",
    },
    {
      question: "What does JSX stand for",
      options: [
        "Javascript XML",
        "Java XML",
        "Just a syntax",
        "None of the above",
      ],
      answer: "Javascript XML",
    },
    {
      question: "What is the output of this code?  [console.log(typeof 42)]",
      options: ["String", "Number", "Boolean", "Object"],
      answer: "Number",
    },
    {
      question:
        "Which of the following is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()",
    },
    {
      question: "What is the output of this code?  [console.log(2 + '2')]",
      options: ["4", "22", "undefined", "NaN"],
      answer: "22",
    },
  ];

  const initialAnswers = [null, null, null, null,null,null];

  const [userAnswers, setUserAnswers] = useState(initialAnswers);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selectedAnswer = userAnswers[currentQuestion];

  const handleSelectOption = (option) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;

    setUserAnswers(newUserAnswers);
  };

  const goToNext = () => {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  function restartQuiz() {
    setUserAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={userAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>

      {questionBank[currentQuestion].options.map((option) => (
        <button
          className={"option" + (selectedAnswer === option ? " selected " : "")}
          key={option}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
