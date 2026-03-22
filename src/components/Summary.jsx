export default function Summary({ userAnswer, questions, onRestart }) {
  const skippedAnswers = userAnswer.filter((ans) => ans === null);

  const correctAnswers = userAnswer.filter(
    (ans) => ans !== null && ans.isCorrect
  );

  const wrongAnswers = userAnswer.filter(
    (ans) => ans !== null && !ans.isCorrect
  );

  const skippedShare = Math.round(
    (skippedAnswers.length / userAnswer.length) * 100
  );
  const correctShare = Math.round(
    (correctAnswers.length / userAnswer.length) * 100
  );
  const wrongShare = Math.round(
    (wrongAnswers.length / userAnswer.length) * 100
  );

  return (
    <div className="text-white max-w-4xl mx-auto sm:mt-10 px-3 sm:px-4">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Quiz Summary
        </h2>

        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 transition px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
        >
          Restart Quiz
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6 text-xs sm:text-sm">
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <p className="text-xl sm:text-2xl font-semibold text-yellow-400">
            {skippedShare}%
          </p>
          <p className="text-gray-400">Skipped</p>
        </div>
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <p className="text-xl sm:text-2xl font-semibold text-green-400">
            {correctShare}%
          </p>
          <p className="text-gray-400">Correct</p>
        </div>
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <p className="text-xl sm:text-2xl font-semibold text-red-400">
            {wrongShare}%
          </p>
          <p className="text-gray-400">Wrong</p>
        </div>
      </div>

      <div className="bg-gray-950 rounded-lg p-3 sm:p-4 h-100 sm:h-112.5 overflow-y-auto custom-scrollbar">
        <ol className="space-y-3 sm:space-y-4">
          {userAnswer.map((ans, index) => {
            const question = questions[index];

            if (!question) return null;

            const correctOption = question.options.find(
              (opt) => opt.isCorrect
            );
            const correctText = correctOption?.text || "N/A";
            const userText = ans !== null ? ans.text : "Skipped";
            const isCorrect = ans !== null && ans.isCorrect;

            return (
              <li
                key={index}
                className="bg-gray-900 p-3 sm:p-4 rounded-lg"
              >
                <h3 className="text-xs text-gray-500 mb-1">
                  Question {index + 1}
                </h3>

                <p className="font-medium mb-2 text-sm sm:text-base">
                  {question.text}
                </p>

                <p
                  className={`font-medium text-sm sm:text-base ${
                    ans === null
                      ? "text-yellow-400"
                      : isCorrect
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Your Answer: {userText}
                </p>

                {!isCorrect && (
                  <p className="text-green-400 mt-1 text-sm sm:text-base">
                    Correct Answer: {correctText}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}