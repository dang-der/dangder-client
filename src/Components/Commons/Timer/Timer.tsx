import { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}
export default function Timer({ initialTime, onTimerEnd }: TimerProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimerEnd();
    }
    if (time > 0) {
      const Counter = setInterval(() => {
        setTime((p) => p - 1000);
      }, 1000);
      return () => clearInterval(Counter);
    }
  }, [time]);

  return (
    <div style={{ fontSize: "0.875rem" }}>
      {(Math.floor(time / (60 * 1000)) + "").padStart(2, "0")} :
      {String(Math.floor((time % (60 * 1000)) / 1000)).padStart(2, "0")}
    </div>
  );
}
