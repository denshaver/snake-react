import type { GameMode } from "../types/layout";

interface IFooterProps {
  mode: GameMode;
  count: number;
}

export default function Footer({ mode, count }: IFooterProps) {
  return (
    <div className="footer">
      <h2>Mode: {mode}</h2>
      <h2>{count} xp</h2>
    </div>
  );
}
