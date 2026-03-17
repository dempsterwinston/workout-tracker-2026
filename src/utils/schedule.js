const WORKOUT_DAYS = ["Tuesday", "Thursday", "Saturday"];
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getTodayWorkout() {
  const dayName = DAY_NAMES[new Date().getDay()];
  return WORKOUT_DAYS.includes(dayName) ? dayName : null;
}

export function getNextWorkout() {
  const todayIndex = new Date().getDay();
  const workoutIndices = WORKOUT_DAYS.map((d) => DAY_NAMES.indexOf(d));

  for (let i = 1; i <= 7; i++) {
    const next = (todayIndex + i) % 7;
    if (workoutIndices.includes(next)) {
      return DAY_NAMES[next];
    }
  }
  return null;
}
