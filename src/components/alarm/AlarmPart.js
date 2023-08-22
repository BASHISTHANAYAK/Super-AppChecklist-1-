import React, { useState, useEffect } from 'react';
import './alarm.css';
import Uparrow from './upArrow.png';
import DownArrow from './downArrow.png';

function Alarm() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval;

    if (start) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          // Timer completed, stop the timer
          setStart(false);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start, hours, minutes, seconds]);

  function ClickStart() {
    setStart((prev) => !prev);
  }

  //hours
  function HourUp() {
    setHours((pre) => pre + 1);
  }
  function HourDown() {
    setHours((pre) => {
      if (pre < 10) {
      }
      if (pre < 1) {
        return 0;
      } else {
        return pre - 1;
      }
    });
  }

  //minutesUp
  function minutesUp() {
    setMinutes((pre) => {
      if (pre === 59) {
        setHours((pre) => pre + 1);
        return 0;
      } else {
        return pre + 1;
      }
    });
  }

  function minutesDown() {
    setMinutes((pre) => {
      if (pre < 1) {
        return 0;
      } else {
        return pre - 1;
      }
    });
  }

  //secondsUp
  function secondsUp() {
    setSeconds((pre) => {
      if (pre === 59) {
        setMinutes((pre) => pre + 1);
        return 0;
      } else {
        return pre + 1;
      }
    });
  }

  function secondsDown() {
    setSeconds((pre) => {
      if (pre < 1) {
        return 0;
      } else {
        return pre - 1;
      }
    });
  }

  return (
    <div className="Entire--container">
      <div className="Circle--part">
        <div className="TimeCircle">
          {hours > 9 ? hours : '0' + hours}:
          {minutes > 9 ? minutes : '0' + minutes}:
          {seconds > 9 ? seconds : '0' + seconds}
        </div>
      </div>
      <div className="Timer--choose--part">
        <div className="Hr--Mn--Se--container">
          <div className="hours">
            <p>Hours</p>
            <p className="Up--arrow">
              <img src={Uparrow} alt="Uparrow" onClick={HourUp} />
            </p>
            <p>{hours > 9 ? hours : '0' + hours}</p>
            <p className="Down--arrow">
              <img src={DownArrow} alt="DownArrow" onClick={HourDown} />
            </p>
          </div>
          <p className="dubble--separator">:</p>
          <div className="minutes">
            <p>Minutes</p>
            <p className="Up--arrow">
              <img src={Uparrow} alt="Uparrow" onClick={minutesUp} />
            </p>
            <p>{minutes > 9 ? minutes : '0' + minutes}</p>
            <p className="Down--arrow">
              <img src={DownArrow} alt="DownArrow" onClick={minutesDown} />
            </p>
          </div>
          <p className="dubble--separator">:</p>
          <div className="seconds">
            <p>Seconds</p>
            <p className="Up--arrow">
              <img src={Uparrow} alt="Uparrow" onClick={secondsUp} />
            </p>
            <p>{seconds > 9 ? seconds : '0' + seconds}</p>
            <p className="Down--arrow">
              <img src={DownArrow} alt="DownArrow" onClick={secondsDown} />
            </p>
          </div>
        </div>
        <div className="Button">
          <button onClick={ClickStart}>{!start ? 'Start' : 'Stop'}</button>
        </div>
      </div>
    </div>
  );
}

export default Alarm;
