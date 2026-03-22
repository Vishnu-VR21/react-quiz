import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuiz(questions) {
  const grouped = {
    beginner: questions.filter((q) => q.level === "beginner"),
    intermediate: questions.filter((q) => q.level === "intermediate"),
    expert: questions.filter((q) => q.level === "expert"),
  };

  const selected = [
    ...shuffle(grouped.beginner).slice(0, 10),
    ...shuffle(grouped.intermediate).slice(0, 10),
    ...shuffle(grouped.expert).slice(0, 10),
  ];

  return shuffle(selected);
}

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const activeQuestionIndex = userAnswer.length;
  const quizOver = activeQuestionIndex === quizQuestions.length;

  const handleStart = () => {
    const generated = generateQuiz(QUESTIONS);
    setQuizQuestions(generated);
    setUserAnswer([]);
    setIsStarted(true);
  };

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkip = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to test your React knowledge?
          </h2>

          <p className="text-gray-400 mb-6">Click start to begin the quiz</p>

          <button
            onClick={handleStart}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizOver) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-6">
          <Summary
            userAnswer={userAnswer}
            questions={quizQuestions}
            onRestart={handleStart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <p className="text-sm text-white">
            Question {activeQuestionIndex + 1} / {quizQuestions.length}
          </p>

          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((activeQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Question
          key={activeQuestionIndex}
          question={quizQuestions[activeQuestionIndex]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkip}
        />
      </div>
    </div>
  );
}
