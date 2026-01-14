import { useContext, useState } from "react";
import { HabitContext } from "../store/habitContext";
import { Pen, X } from "lucide-react";
import { axiosInstance } from "../axiosInstance";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Habit({ habit, setEditHabit, toggleModal, showStats }) {
  const { removeHabit } = useContext(HabitContext);
  const [completions, setCompletions] = useState(0);
  const [loadingCompletions, setLoadingCompletions] = useState(true);
  const habitContainerClass = `w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-52 xl:w-56 rounded-lg border border-slate-200 p-3 sm:p-4 flex flex-col gap-2 relative`;

  useEffect(() => {
    fetchCompletions();
  }, [habit._id]);

  async function fetchCompletions() {
    try {
      setLoadingCompletions(true);
      const response = await axiosInstance.get(
        `/completions/${habit._id}/stats`
      );
      setCompletions(response.data.totalCompletions || 0);
    } catch (error) {
      toast("Error getting completions");
      setCompletions(0);
    } finally {
      setLoadingCompletions(false);
    }
  }

  function handleDelete(e) {
    e.stopPropagation();
    removeHabit(habit._id);
    toast.success(habit.title + " Habit Removed");
  }

  function handleEdit(e) {
    e.stopPropagation();
    setEditHabit(habit);
    toggleModal();
  }

  function handleStats(e) {
    e.stopPropagation();
    showStats(habit);
  }

  async function handleHabitClick(e) {
    if (e.target.closest("button")) {
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await axiosInstance.post("/completions/toggle", {
        habitId: habit._id,
        date: today,
      });
      if (response.data.completed) {
        console.log("Habit completed for today");
      } else {
        console.log("Habit completion removed");
      }
      await fetchCompletions();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "failed to complete");
    }
  }

  return (
    <div
      className={habitContainerClass}
      style={{ backgroundColor: habit.color || "white" }}
      onClick={handleHabitClick}
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
          onClick={handleDelete}
        >
          <X size={15}></X>
        </button>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 pt-2">
        {habit.title}
      </h2>
      {habit.description ? (
        <p className="text-sm text-black">{habit.description}</p>
      ) : null}
      <div className="mt-auto pt-2 border-t border-black/10">
        <div className="gap-2">
          {loadingCompletions ? (
            <span className="text-sm text-black">Loading...</span>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">
                {completions}
              </span>
              <button
                onClick={handleStats}
                className=" text-black p-1 border rounded-md"
              >
                Stats
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
