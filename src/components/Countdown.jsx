import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (secs) => {
    const days = Math.floor(secs / (24 * 60 * 60));
    const hours = Math.floor((secs % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((secs % (60 * 60)) / 60);
    const seconds = secs % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div >
      <div className="text-3xl font-bold">
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
      </div>
      
    </div>
  );
};

export default CountdownTimer;