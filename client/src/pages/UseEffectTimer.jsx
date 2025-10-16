import { useEffect, useState } from "react";

export default function UseEffectTimer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`Interval running`);
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{timer}</p>
    </div>
  );
}
