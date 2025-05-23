import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Progress({ theme, user }) {
console.log('Progress component data:', { theme, userId: user?.data?.id });


// статичекий прогрес для примера!
 const [progress, setProgress] = useState(0);
  const targetProgress = parseFloat(theme.progress);
 

  // const obj = {
  //   now: 10,
  //   now1: 50,
  //   now2: 90,
  // }

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= targetProgress) {
        current = targetProgress;
        clearInterval(interval);
      }
      setProgress(current);
    }, 10); // скорость анимации
    return () => clearInterval(interval);
  }, [targetProgress]);

  return (
    <div className="progress-container">
      <div>
        <h2>{theme.themeName}</h2>
      </div>
      <div className="progress-wrapper">
        <ProgressBar
          style={{
            width: '100%',
            height: '35px',
            borderRadius: '30px',
            backgroundColor: 'white',
            border: '1px solid #ff7d97 ',
            color: 'black',
          }}
          className="my-salad-progress"
          now={progress}
          label=""
        />
        <div className="progress-label-centered">{theme.progress}%</div>
      </div>
    </div>
  );
}
// progress заменил theme.progress