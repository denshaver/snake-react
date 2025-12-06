import { useEffect, useState } from "react";

export default function useTimer(stepInMs: number = 1000) {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + stepInMs);
    }, stepInMs);

    return () => clearInterval(interval);
  }, [isActive, stepInMs]);

  return {
    timer,
    pause: () => setIsActive(false),
    resume: () => setIsActive(true),
  };
}
