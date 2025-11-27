import { useEffect, useState } from "react";
import useTimer from "./hooks/useTimer";
import useControls from "./hooks/useControls";

const max_position = 15;
const startPoint = Math.round(max_position / 2);

console.log(startPoint);

export default function App() {
  const timer = useTimer(750);
  const direction = useControls();

  const [position, setPosition] = useState([startPoint, startPoint]);
  const [xPosition, yPosition] = position;

  useEffect(() => {
    if (timer === 0) return;
    if (direction === "up" || direction === "down") {
      let newPosition = direction === "up" ? xPosition - 1 : xPosition + 1;
      if (newPosition >= max_position) {
        newPosition = 0;
      } else if (newPosition <= 0) {
        newPosition = max_position;
      }
      setPosition([newPosition, yPosition]);
    } else {
      let newPosition = direction === "left" ? yPosition - 1 : yPosition + 1;
      if (newPosition <= 0) {
        newPosition = max_position;
      } else if (newPosition >= max_position) {
        newPosition = 0;
      }
      setPosition([xPosition, newPosition]);
    }
  }, [timer]);

  return (
    <>
      <div className="container">
        <div
          className="viewbox"
          style={{
            gridTemplate: `repeat(${max_position}, 1fr) / repeat(${max_position}, 1fr)`,
          }}
        >
          <div
            className="player"
            style={{
              gridArea: `${xPosition} / ${yPosition} / span 1 / span 1`,
            }}
          ></div>
        </div>

        <h2>Current direction: {direction}</h2>
      </div>
    </>
  );
}
