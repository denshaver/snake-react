import Overlay from "./Overlay";
import type { GameMode } from "../types/layout";
import useGame, { gameSettings } from "../hooks/useGame";
import EntitiesList from "./EntitiesList";
import Footer from "./Footer";

export interface IGameProps {
  mode: GameMode;
  handleReturnToMenu: () => void;
}

export default function Game({ mode, handleReturnToMenu }: IGameProps) {
  const game = useGame(mode);

  if (!game) {
    return <h2>Something went wrong</h2>;
  }

  const { togglePause, entities, count, isGameOver, isPause } = game;
  const maxPosition = gameSettings.maxPosition;

  return (
    <>
      <div
        className="viewbox"
        style={{
          gridTemplate: `repeat(${maxPosition}, 1fr) / repeat(${maxPosition}, 1fr)`,
        }}
        onClick={togglePause}
      >
        <EntitiesList entities={entities} />

        <Overlay
          isPause={isPause}
          isGameOver={isGameOver}
          handleReturnToMenu={handleReturnToMenu}
        />
      </div>

      <Footer mode={mode} count={count} />
    </>
  );
}
