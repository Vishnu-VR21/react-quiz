import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({ question, onSelectAnswer, onSkipAnswer }) {
  const [answerStateData, setAnswerStateData] = useState({
    selectedAnswer: null,
    isCorrect: null,
  });

  let timer = 20000;

  if (answerStateData.selectedAnswer) {
    timer = 1000;
  }

  if (answerStateData.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelect(option) {
    setAnswerStateData({
      selectedAnswer: option,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswerStateData({
        selectedAnswer: option,
        isCorrect: option.isCorrect,
      });

      setTimeout(() => {
        onSelectAnswer(option);
      }, 1000);
    }, 1000);
  }

  let answerState = "";

  if (answerStateData.selectedAnswer && answerStateData.isCorrect !== null) {
    answerState = answerStateData.isCorrect ? "correct" : "wrong";
  } else if (answerStateData.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={
          answerStateData.selectedAnswer === null ? onSkipAnswer : null
        }
        mode={answerState}
      />
      <h2 className="text-white">{question.text}</h2>
      <Answers
        options={question.options}
        selectedAnswer={answerStateData.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelect}
      />
    </div>
  );
}
