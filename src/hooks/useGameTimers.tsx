import { useState } from "react";
import useTimer from "./useTimer";

export default function useGameTimers(delayMs: number) {
  const [isPause, setIsPause] = useState(false);

  const {
    timer: snakeTimer,
    pause: pauseSnake,
    resume: resumeSnake,
  } = useTimer(delayMs);

  const {
    timer: pointsTimer,
    pause: pausePoints,
    resume: resumePoints,
  } = useTimer(delayMs * 20);

  const pauseAll = () => {
    pauseSnake();
    pausePoints();
  };

  const resumeAll = () => {
    resumeSnake();
    resumePoints();
  };

  const togglePause = () => {
    if (isPause) {
      resumeAll;
      setIsPause(false);
    } else {
      pauseAll;
      setIsPause(true);
    }
  };

  return {
    snakeTimer,
    pointsTimer,
    pauseAll,
    isPause,
    togglePause,
  };
}
