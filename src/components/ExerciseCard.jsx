import { useState, useEffect, useRef } from "react";

const TYPE_LABELS = {
  compound: { label: "Compound", color: "#e85d3a" },
  accessory: { label: "Accessory", color: "#3a7be8" },
  isolation: { label: "Isolation", color: "#8b5cf6" },
  extra: { label: "Extra", color: "#3ab87a" },
};

export default function ExerciseCard({ exercise, exerciseIndex, setsDone, onToggleSet }) {
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(exercise.rest);
  const intervalRef = useRef(null);

  const allDone = setsDone.every(Boolean);
  const doneCnt = setsDone.filter(Boolean).length;
  const typeInfo = TYPE_LABELS[exercise.type] || TYPE_LABELS.accessory;

  useEffect(() => {
    if (timerActive && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setTimerActive(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive]);

  function startTimer() {
    setSecondsLeft(exercise.rest);
    setTimerActive(true);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    setTimerActive(false);
    setSecondsLeft(exercise.rest);
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const timerPct = timerActive ? ((exercise.rest - secondsLeft) / exercise.rest) * 100 : 0;

  return (
    <div className={`exercise-card ${allDone ? "card-done" : ""}`}>
      <div className="card-top">
        <div className="card-info">
          <div className="card-name">{exercise.name}</div>
          <div className="card-meta">
            <span className="meta-chip">{exercise.sets} sets</span>
            <span className="meta-chip">{exercise.reps} reps</span>
            <span
              className="meta-chip type-chip"
              style={{ "--chip-color": typeInfo.color }}
            >
              {typeInfo.label}
            </span>
          </div>
        </div>

        {allDone && <div className="card-check">✓</div>}
      </div>

      {/* Set Buttons */}
      <div className="sets-row">
        <span className="sets-label">Sets</span>
        <div className="set-buttons">
          {setsDone.map((done, i) => (
            <button
              key={i}
              className={`set-btn ${done ? "set-done" : ""}`}
              onClick={() => onToggleSet(i)}
              aria-label={`Set ${i + 1} ${done ? "completed" : "incomplete"}`}
            >
              {done ? "✓" : i + 1}
            </button>
          ))}
        </div>
        <span className="sets-count">
          {doneCnt}/{exercise.sets}
        </span>
      </div>

      {/* Rest Timer */}
      <div className="timer-row">
        {timerActive ? (
          <div className="timer-active">
            <div className="timer-bar-wrap">
              <div className="timer-bar" style={{ width: `${timerPct}%` }} />
            </div>
            <div className="timer-display">
              <span className="timer-icon">⏱</span>
              <span className="timer-time">{formatTime(secondsLeft)}</span>
              <button className="timer-stop" onClick={stopTimer}>
                Stop
              </button>
            </div>
          </div>
        ) : (
          <button className="timer-start-btn" onClick={startTimer}>
            <span>⏱</span>
            Rest {formatTime(exercise.rest)}
          </button>
        )}
      </div>
    </div>
  );
}
