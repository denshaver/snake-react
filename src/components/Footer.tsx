import type { GameMode } from "../types/game";

interface IFooterProps {
  mode: GameMode;
  score: number;
}

export default function Footer({ mode, score }: IFooterProps) {
  return (
    <div className="footer">
      <h2>Mode: {mode}</h2>
      <h2>{score} xp</h2>
    </div>
  );
}
