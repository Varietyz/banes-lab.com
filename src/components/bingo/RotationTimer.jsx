import React, { useEffect, useState } from 'react';

/**
 *
 * @param root0
 * @param root0.endTime
 */
export default function RotationTimer({ endTime }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return null;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (!tl) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) return <span className="text-green-500">Rotation complete!</span>;
  return (
    <span>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}
