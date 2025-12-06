import Overlay from "./Overlay";
import useGame, { gameSettings } from "../hooks/useGame";
import EntitiesList from "./EntitiesList";
import Footer from "./Footer";
import { useSearchParams } from "react-router";
import { handleGameMode } from "../lib/game/handle-game-mode";

export default function Game() {
  const [searchParams] = useSearchParams();
  const mode = handleGameMode(searchParams.get("mode"));
  const game = useGame(mode);

  if (!game) {
    return <h2>Something went wrong</h2>;
  }

  const { togglePause, entities, count, isGameOver, isPause } = game;
  const maxPosition = gameSettings.maxPosition;

  return (
    <div className="container">
      <div
        className="viewbox"
        style={{
          gridTemplate: `repeat(${maxPosition}, 1fr) / repeat(${maxPosition}, 1fr)`,
        }}
        onClick={togglePause}
      >
        <EntitiesList entities={entities} />

        <Overlay isPause={isPause} isGameOver={isGameOver} />
      </div>

      <Footer mode={mode} count={count} />
    </div>
  );
}
