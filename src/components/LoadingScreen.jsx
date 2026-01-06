import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "Välkommen!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        // Liten paus efter färdig skrivning
        const done = setTimeout(() => onComplete?.(), 800);
        return () => clearTimeout(done);
      }
    }, 100);

    // 🔒 Failsafe: se till att vi alltid går vidare även om intervallet strular på mobil
    const failsafe = setTimeout(() => onComplete?.(), 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      {/* För prefer-reduced-motion kan du styra blink/animation i CSS */}
      <div className="mb-4 text-4xl font-mono font-bold">
        {text}
        <span className="animate-blink ml-1" aria-hidden="true"> | </span>
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar" />
      </div>
    </div>
  );
};
