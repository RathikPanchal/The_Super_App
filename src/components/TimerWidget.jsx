import React, { useState, useEffect, useRef } from "react";

export const TimerWidget = () => {
  // Time state (set by user)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Countdown state
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const audioContextRef = useRef(null);

  // Calculate circumference of SVG progress ring (r=55, C=2*pi*r ~ 345.5)
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  // Synthesize beep sound dynamically using Web Audio API
  const playBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      // Play 3 successive quick warning beeps
      let startTime = audioCtx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(880, startTime); // 880Hz pitch

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
        gain.gain.setValueAtTime(0.5, startTime + 0.2);
        gain.gain.linearRampToValueAtTime(0, startTime + 0.25);

        osc.start(startTime);
        osc.stop(startTime + 0.3);

        startTime += 0.4;
      }

      // Close context after play
      setTimeout(() => {
        if (audioCtx.state !== "closed") {
          audioCtx.close();
        }
      }, 1500);
    } catch (err) {
      console.warn("Web Audio alert error:", err);
    }
  };

  // Synchronize changes to user settings
  useEffect(() => {
    if (!isRunning) {
      const calculated = hours * 3600 + minutes * 60 + seconds;
      setTotalSeconds(calculated);
      setSecondsLeft(calculated);
    }
  }, [hours, minutes, seconds, isRunning]);

  // Main countdown logic
  useEffect(() => {
    if (isRunning && !isPaused && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, secondsLeft]);

  // Settings Handlers
  const adjustTime = (type, action) => {
    if (isRunning) return; // Disallow edits during run
    
    if (type === "hours") {
      setHours((h) => {
        if (action === "inc") return h < 99 ? h + 1 : h;
        return h > 0 ? h - 1 : 0;
      });
    } else if (type === "minutes") {
      setMinutes((m) => {
        if (action === "inc") return m < 59 ? m + 1 : 0;
        return m > 0 ? m - 1 : 59;
      });
    } else if (type === "seconds") {
      setSeconds((s) => {
        if (action === "inc") return s < 59 ? s + 1 : 0;
        return s > 0 ? s - 1 : 59;
      });
    }
  };

  // Actions
  const handleStartPause = () => {
    if (totalSeconds === 0) return;

    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  // Helper formatting numbers to 2 digits
  const formatDigit = (num) => String(num).padStart(2, "0");

  // Calculate remaining segments
  const displayHours = Math.floor(secondsLeft / 3600);
  const displayMinutes = Math.floor((secondsLeft % 3600) / 60);
  const displaySeconds = secondsLeft % 60;

  // Progress Calculation
  const progressRatio = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="timer-widget">
      {/* Dynamic SVG Circular Ring */}
      <div className="timer-circular-container">
        <svg className="timer-svg">
          <circle
            cx="65"
            cy="65"
            r={radius}
            className="timer-track-circle"
          />
          <circle
            cx="65"
            cy="65"
            r={radius}
            className="timer-progress-circle"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="timer-digital-display">
          <span>
            {formatDigit(displayHours)}:{formatDigit(displayMinutes)}:{formatDigit(displaySeconds)}
          </span>
        </div>
      </div>

      {/* Adjustments and controls panel */}
      <div className="timer-controls-pane">
        <div className="timer-settings-row">
          <div className="timer-setting-item">
            <span className="timer-setting-label">Hours</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("hours", "inc")}
              disabled={isRunning}
            >
              ▲
            </button>
            <span className="timer-setting-value">{formatDigit(hours)}</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("hours", "dec")}
              disabled={isRunning}
            >
              ▼
            </button>
          </div>

          <span className="timer-colon-divider">:</span>

          <div className="timer-setting-item">
            <span className="timer-setting-label">Minutes</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("minutes", "inc")}
              disabled={isRunning}
            >
              ▲
            </button>
            <span className="timer-setting-value">{formatDigit(minutes)}</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("minutes", "dec")}
              disabled={isRunning}
            >
              ▼
            </button>
          </div>

          <span className="timer-colon-divider">:</span>

          <div className="timer-setting-item">
            <span className="timer-setting-label">Seconds</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("seconds", "inc")}
              disabled={isRunning}
            >
              ▲
            </button>
            <span className="timer-setting-value">{formatDigit(seconds)}</span>
            <button
              type="button"
              className="timer-setting-arrow"
              onClick={() => adjustTime("seconds", "dec")}
              disabled={isRunning}
            >
              ▼
            </button>
          </div>
        </div>

        <div className="timer-actions-row">
          <button
            type="button"
            className="timer-action-btn"
            onClick={handleStartPause}
            disabled={totalSeconds === 0}
          >
            {!isRunning ? "Start" : isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
