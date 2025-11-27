import { useEffect, useState } from "react";

export default function useTimer(stepInMs: number = 1000) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + stepInMs);
    }, stepInMs);

    () => clearInterval(interval);
  }, []);

  return timer;
}
