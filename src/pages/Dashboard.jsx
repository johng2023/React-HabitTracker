import { useNavigate } from "react-router-dom";
import HabitGrid from "../components/HabitGrid";
import HabitButton from "../components/HabitButton";
import { useState } from "react";
import { HabitContext } from "../store/habitContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);

  const { habits, loading, fetchHabits, clearHabits } =
    useContext(HabitContext);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "No Name";

  useEffect(() => {
    fetchHabits();
  }, []);

  function signOut() {
    clearHabits();
    localStorage.clear();
    navigate("/");
  }

  function toggleModal() {
    setShowModal((prev) => !prev);
    if (showModal) {
      setEditHabit(null);
    }
  }

  return (
    <>
      <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 border-b-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-black text-center sm:text-left">
          {username}'s Habits
        </h1>
        <button
          onClick={signOut}
          className="bg-gray-900 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base sm:w-auto"
        >
          Sign Out
        </button>
      </header>

      <div>
        {habits.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-10">
            <HabitButton
              showModal={showModal}
              toggleModal={toggleModal}
              editHabit={editHabit}
            ></HabitButton>
            <HabitGrid
              showModal={showModal}
              toggleModal={toggleModal}
              setEditHabit={setEditHabit}
            ></HabitGrid>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-2xl sm:text-3xl text-center m-3 px-4">
              No Habits Exist
            </h1>
            <p className="text-center px-4">
              Create a new habit to get started
            </p>
            <HabitButton
              showModal={showModal}
              toggleModal={toggleModal}
            ></HabitButton>
          </div>
        )}
      </div>
    </>
  );
}
