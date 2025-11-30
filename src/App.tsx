import { useState } from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";
import type { GameMode, Layout } from "./types/layout";

export default function App() {
  const [layout, setLayout] = useState<Layout>("menu");
  const [mode, setMode] = useState<GameMode>("easy");

  function startGame(mode: GameMode) {
    setMode(mode);
    setLayout("game");
  }

  function returnToMenu() {
    setLayout("menu");
  }

  return (
    <>
      <div className="container">
        {layout === "menu" && <Menu handleStartGame={startGame} />}
        {layout === "game" && (
          <Game mode={mode} handleReturnToMenu={returnToMenu} />
        )}
      </div>
    </>
  );
}
