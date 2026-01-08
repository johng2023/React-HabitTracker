import { useNavigate } from "react-router-dom";
import HabitGrid from "../components/HabitGrid";
import HabitButton from "../components/HabitButton";
import { useState } from "react";
import { HabitContext } from "../store/habitContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { habits, loading, fetchHabits, clearHabits } =
    useContext(HabitContext);
  const navigate = useNavigate();

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
  }

  return (
    <>
      <header className="mx-auto w-3/4 py-8 px-8 flex justify-between items-center border-b-3">
        <h1 className="text-3xl font-bold text-black">Username's Habits</h1>
        <button
          onClick={signOut}
          className="bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold"
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
            ></HabitButton>
            <HabitGrid></HabitGrid>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-3xl text-center m-3">No Habits Exist</h1>
            <p>Create a new habit to get started</p>
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
