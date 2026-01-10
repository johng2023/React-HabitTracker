import { useContext } from "react";
import { HabitContext } from "../store/habitContext";
import { Pen, X } from "lucide-react";

export default function Habit({ habit, setEditHabit, toggleModal }) {
  const { removeHabit } = useContext(HabitContext);
  const habitContainerClass = `w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-52 xl:w-56 rounded-lg border border-slate-200 p-3 sm:p-4 flex flex-col gap-2 relative`;

  function handleEdit() {
    setEditHabit(habit);
    toggleModal();
  }

  return (
    <div
      className={habitContainerClass}
      style={{ backgroundColor: habit.color || "white" }}
    >
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          className="w-6 h-6 flex items-center justify-center"
          onClick={handleEdit}
        >
          <Pen size={15}></Pen>
        </button>
        <button
          className="w-6 h-6 flex items-center justify-center"
          onClick={() => removeHabit(habit._id)}
        >
          <X></X>
        </button>
      </div>
      <h2 className="text-xl font-semibold text-slate-900">{habit.title}</h2>
      {habit.description ? (
        <p className="text-sm text-black leading-relaxed">
          {habit.description}
        </p>
      ) : null}
    </div>
  );
}
