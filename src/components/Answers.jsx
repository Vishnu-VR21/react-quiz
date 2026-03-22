import { useRef } from "react";

export default function Answers({
  options,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledOptions = useRef();

  if (!shuffledOptions.current) {
    shuffledOptions.current = [...options].sort(() => Math.random() - 0.5);
  }

  return (
    <ul className="flex flex-col gap-3 mt-4">
      {shuffledOptions.current.map((option) => {
        let cssClass =
          "w-full text-left px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white transition-all duration-200 hover:bg-gray-700 hover:border-gray-400 cursor-pointer";

        const isSelected = selectedAnswer === option;
        if (answerState === "answered" && isSelected) {
          cssClass += " border-yellow-400 bg-yellow-500/20";
        }

        if (answerState === "correct" || answerState === "wrong") {
          if (option.isCorrect) {
            cssClass += " border-green-500 bg-green-500/20";
          } else if (isSelected) {
            cssClass += " border-red-500 bg-red-500/20";
          }
        }

        return (
          <li key={option.text}>
            <button
              onClick={() => onSelect(option)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {option.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
