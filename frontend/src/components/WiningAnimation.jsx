import { useEffect, useState } from "react";

export default function WiningAnimation({winner, onRestart}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black" style={{opacity: show ? 0.7 : 0, transition: "opacity 2s ease-in-out"}}>
      <h1 className={`text-white text-6xl md:text-8xl font-bold opacity-0 transform scale-90 transition-all duration-3000 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        {`Player ${winner} Wins!`}
      </h1>
      <button onClick={onRestart} className="absolute bottom-10 bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition">
        Play Again
      </button>
    </div>
  );
}
