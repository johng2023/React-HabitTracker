import Habit from "./Habit";
import { HabitContext } from "../store/habitContext";
import { useContext } from "react";

export default function HabitGrid() {
  const { habits, loading } = useContext(HabitContext);

  return loading ? (
    <p>Habits are loading...</p>
  ) : (
    <div className="grid grid-cols-3 gap-3 w-1/2 mx-auto border rounded-lg p-8 m-5 justify-items-center items-center">
      {habits.map((habit) => (
        <Habit key={habit.title} habit={habit}></Habit>
      ))}
    </div>
  );
}
