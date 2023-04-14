import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`${year}-${month}-${day}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div className="timer-container">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</div>
      <div className="input-container">
        <div className="input-group">
          <label>
            Year
            <input type="number" value={year} onChange={e => setYear(e.target.value)} />
          </label>
        </div>
        <div className="input-group">
          <label>
            Month
            <input type="number" value={month} onChange={e => setMonth(e.target.value)} />
          </label>
        </div>
        <div className="input-group">
          <label>
            Day
            <input type="number" value={day} onChange={e => setDay(e.target.value)} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
