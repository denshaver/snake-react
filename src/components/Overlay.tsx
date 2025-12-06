import { useNavigate } from "react-router";

interface IOverlayProps {
  isPause: boolean;
  isGameOver: boolean;
}

export default function Overlay({ isPause, isGameOver }: IOverlayProps) {
  if (!isGameOver && !isPause) {
    return null;
  }

  const navigate = useNavigate();

  return (
    <div
      className="overlap"
      style={{ cursor: isPause ? "pointer" : "default" }}
    >
      <h2>{isGameOver ? "Game Over" : "Pause"}</h2>
      <button className="primary-btn" onClick={() => navigate("/")}>
        Back to menu
      </button>{" "}
    </div>
  );
}
