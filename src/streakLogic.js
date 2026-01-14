import { getLocalDateString } from "./dateLogic";

export function calculateCurrentStreak(completions) {
  console.log("Raw completions:", completions);
  console.log("Today string:", getLocalDateString(new Date()));

  if (!completions || completions.length === 0) return 0;

  const completionDates = new Set(
    completions.map((c) => {
      if (typeof c.completedDate === "string") {
        return c.completedDate.split("T")[0];
      }
      return getLocalDateString(c.completedDate);
    })
  );

  console.log("Completion dates set:", completionDates);

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = getLocalDateString(today);

  console.log("Today:", todayStr);
  console.log(completionDates.has(todayStr));

  if (!completionDates.has(todayStr)) {
    return 0;
  }

  let checkDate = new Date(today);
  while (completionDates.has(getLocalDateString(checkDate))) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  console.log("Final streak:", currentStreak);
  return currentStreak;
}
