import React, { useState, useEffect } from 'react';

interface RelojProps {
  style?: React.CSSProperties;
}

const Reloj: React.FC<RelojProps> = ({ style }) => {
  const [time, setTime] = useState<number>(() => {
    const storedTime = localStorage.getItem('currentTime');
    return storedTime ? parseInt(storedTime) : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        localStorage.setItem('currentTime', String(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Limpia el localStorage cuando se desmonta el componente (cuando se cierra la sesión)
  useEffect(() => {
    return () => {
      localStorage.removeItem('currentTime');
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="reloj" style={style}>{formatTime(time)}</div>
  );
};

export default Reloj;
