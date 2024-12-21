import React, { useEffect, useState, useRef } from 'react';

export default function useTimer(intialVal = 0, interval = 1000) {
  const [timer, setTimer] = useState(intialVal);
  const timerRef = useRef(null);

  const startTimer = () => {
    //  if timer is is already created, dont create another one
    if (timerRef.current) return;
    const timerId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, interval);

    timerRef.current = timerId;
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimer(intialVal);
  };

  useEffect(() => {
    return () => pauseTimer();
  }, []);

  return {
    timer,
    setTimer,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
