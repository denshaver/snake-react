import { useNavigate } from "react-router";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="menu">
        <div className="menu-header">
          <h1>Snake</h1>
          <h5>v 1.0.1</h5>
        </div>

        <div className="menu-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/play?mode=easy")}
          >
            Easy
          </button>
          <button
            className="primary-btn"
            onClick={() => navigate("/play?mode=hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
