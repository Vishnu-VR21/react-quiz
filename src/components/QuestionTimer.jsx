import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setRemainingTime(timeout);
  }, [timeout]);

  useEffect(() => {
    if (!onTimeout) return;

    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timeout]);

  const progress = (remainingTime / timeout) * 100;

  let barColor = "bg-blue-500";

  if (mode === "answered") barColor = "bg-yellow-500";
  if (mode === "correct") barColor = "bg-green-500";
  if (mode === "wrong") barColor = "bg-red-500";

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ease-linear ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-1 text-right">
        {(remainingTime / 1000).toFixed(1)}s
      </p>
    </div>
  );
}