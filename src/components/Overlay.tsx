interface IOverlayProps {
  isPause: boolean;
  isGameOver: boolean;
  handleReturnToMenu: () => void;
}

export default function Overlay({
  isPause,
  isGameOver,
  handleReturnToMenu,
}: IOverlayProps) {
  if (!isGameOver && !isPause) {
    return null;
  }

  return (
    <div
      className="overlap"
      style={{ cursor: isPause ? "pointer" : "default" }}
    >
      <h2>{isGameOver ? "Game Over" : "Pause"}</h2>
      <button className="primary-btn" onClick={handleReturnToMenu}>
        Back to menu
      </button>{" "}
    </div>
  );
}
