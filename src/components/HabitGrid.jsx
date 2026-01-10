import Habit from "./Habit";
import { HabitContext } from "../store/habitContext";
import { useContext } from "react";

export default function HabitGrid({ showModal, toggleModal, setEditHabit }) {
  const { habits, loading } = useContext(HabitContext);

  return loading ? (
    <p>Habits are loading...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-6 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 m-3 sm:m-4 md:m-5 justify-items-center items-center">
      {habits.map((habit) => (
        <Habit
          showModal={showModal}
          toggleModal={toggleModal}
          key={habit._id}
          habit={habit}
          setEditHabit={setEditHabit}
        ></Habit>
      ))}
    </div>
  );
}
