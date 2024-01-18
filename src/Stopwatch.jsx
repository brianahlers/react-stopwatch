// import React, { useState, useEffect, useRef } from 'react';

// function Stopwatch() {
//     const [isRunning, setIsRunning] = useState(false);
//     const [elapsedTime, setElapsedTime] = useState(0);
//     const intervalIDRef = useRef(null);
//     const startTimeRef = useRef(0);

//     useEffect(() => {
//         if (isRunning) {
//             intervalIDRef.current = setInterval(() => {
//                 setElapsedTime(Date.now() - startTimeRef.current);
//             }, 10)
//         }

//         return () => {
//             clearInterval(intervalIDRef.current);
//         };
//     }, [isRunning]);

//     function toggleClock() {
//         if (isRunning) {
//             setIsRunning(false);
//         } else {
//             setIsRunning(true);
//             startTimeRef.current = Date.now() - elapsedTime;
//         }
//     }

//     function reset() {
//         setElapsedTime(0);
//         setIsRunning(false);
//     };

//     function formatTime() {
//         let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//         let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
//         let seconds = Math.floor((elapsedTime / 1000) % 60);
//         let milliseconds = Math.floor(elapsedTime % 1000);

//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
//     };

//     return (
//         <>
//             <h1 className="titleBanner">REACT STOPWATCH</h1>
//             <div className="stopwatch">
//                 <div className="display">{formatTime()}</div>
//                 <div className="controls">
//                     <button onClick={toggleClock} className="toggle-button">
//                         {isRunning ? 'Stop' : 'Start'}
//                     </button>
//                     <button onClick={reset} className="reset-button">Reset</button>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default Stopwatch;

import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, []);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalIDRef.current);
    } else {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalIDRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <h1>REACT STOPWATCH</h1>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>
      <button className="startStop" onClick={startStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>
      <button className="reset" onClick={resetStopwatch}>Reset</button>
    </div>
  );
};

export default Stopwatch;