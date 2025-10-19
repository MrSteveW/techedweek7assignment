import { useEffect, useState } from "react";

export function useCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return count;
}
