import { useState, useEffect } from "react";

export default function Chrono() {
  const [temps, setTemps] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemps((prevTemps) => prevTemps + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setMinutes(Math.floor(temps / 60));
    setSecondes(temps % 60);
  }, [temps]);

  return (
    <span>
      {minutes < 10 ? "0" + minutes : minutes}:
      {secondes < 10 ? "0" + secondes : secondes}
    </span>
  );
}