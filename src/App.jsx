import { useState, useEffect } from "react";
import WorkoutDay from "./components/WorkoutDay";
import NoWorkout from "./components/NoWorkout";
import { workouts } from "./data/workouts";
import { getTodayWorkout } from "./utils/schedule";
import "./App.css";

export default function App() {
  const today = getTodayWorkout();
  const workout = today ? workouts[today] : null;

  const storageKey = today ? `workout-${today}-${getWeekId()}` : null;

  const [completedSets, setCompletedSets] = useState(() => {
    if (!storageKey) return {};
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(completedSets));
    }
  }, [completedSets, storageKey]);

  function toggleSet(exerciseIndex, setIndex) {
    const key = `${exerciseIndex}-${setIndex}`;
    setCompletedSets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function resetWorkout() {
    setCompletedSets({});
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-mark">🏋️</div>
          <div>
            <h1 className="app-title">Lift Log</h1>
            <p className="app-sub">Push · Pull · Legs</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {workout ? (
          <WorkoutDay
            workout={workout}
            dayLabel={today}
            completedSets={completedSets}
            onToggleSet={toggleSet}
            onReset={resetWorkout}
          />
        ) : (
          <NoWorkout />
        )}
      </main>
    </div>
  );
}

function getWeekId() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return `${now.getFullYear()}-W${week}`;
}
