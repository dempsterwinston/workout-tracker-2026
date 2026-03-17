import { getNextWorkout } from "../utils/schedule";

export default function NoWorkout() {
  const next = getNextWorkout();

  return (
    <div className="no-workout">
      <div className="rest-icon">😴</div>
      <h2 className="rest-title">Rest Day</h2>
      <p className="rest-sub">Recovery is part of the program.</p>
      {next && (
        <div className="next-badge">
          Next workout: <strong>{next}</strong>
        </div>
      )}
    </div>
  );
}
