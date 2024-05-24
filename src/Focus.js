import React, { useState, useEffect } from 'react';

function Focus() {
  const [idleTime, setIdleTime] = useState(0);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());

  useEffect(() => {
    const handleMouseMove = () => {
      setLastMouseMove(Date.now());
      setIdleTime(0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      if (Date.now() - lastMouseMove >= 1000) {
        setIdleTime(prevIdleTime => prevIdleTime + 1);
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [lastMouseMove]);

  const minutes = Math.floor(idleTime / 60);
  const hours = Math.floor(minutes / 60);
  const displayMinutes = minutes % 60;

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>집중 시간</h1>
      <h2>{`${hours}시간 ${displayMinutes}분`}</h2>
    </div>
  );
}

export default Focus;
