import ExerciseCard from "./ExerciseCard";

export default function WorkoutDay({
  workout,
  dayLabel,
  completedSets,
  onToggleSet,
  onReset,
}) {
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const doneSets = Object.values(completedSets).filter(Boolean).length;
  const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
  const allDone = doneSets === totalSets;

  return (
    <div className="workout-day" style={{ "--accent": workout.accent }}>
      {/* Day Header */}
      <div className="day-header">
        <div className="day-badge">
          <span className="day-emoji">{workout.emoji}</span>
          <div>
            <div className="day-name">{workout.day} Day</div>
            <div className="day-label">{dayLabel}</div>
          </div>
        </div>

        <button className="reset-btn" onClick={onReset} title="Reset workout">
          ↺ Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-wrap">
        <div className="progress-meta">
          <span className="progress-label">
            {allDone ? "🎉 Workout Complete!" : "Progress"}
          </span>
          <span className="progress-count">
            {doneSets} / {totalSets} sets
          </span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${allDone ? "done" : ""}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="progress-pct">{pct}%</div>
      </div>

      {/* Exercise List */}
      <div className="exercise-list">
        {workout.exercises.map((exercise, i) => {
          const setsDone = Array.from({ length: exercise.sets }, (_, s) =>
            completedSets[`${i}-${s}`] ? true : false
          );
          return (
            <ExerciseCard
              key={i}
              exercise={exercise}
              exerciseIndex={i}
              setsDone={setsDone}
              onToggleSet={(s) => onToggleSet(i, s)}
            />
          );
        })}
      </div>
    </div>
  );
}
