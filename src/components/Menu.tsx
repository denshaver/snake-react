import type { GameMode } from "../types/layout";

interface IMenuProps {
  handleStartGame: (mode: GameMode) => void;
}

export default function Menu({ handleStartGame }: IMenuProps) {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1>Snake</h1>
        <h5>v 1.0.0</h5>
      </div>
      <div className="menu-actions">
        <button className="primary-btn" onClick={() => handleStartGame("easy")}>
          Easy
        </button>
        <button className="primary-btn" onClick={() => handleStartGame("hard")}>
          Hard
        </button>
      </div>
    </div>
  );
}
