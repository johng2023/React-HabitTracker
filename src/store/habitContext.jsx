import { createContext, useState, useCallback } from "react";
import { axiosInstance } from "../axiosInstance";

export const HabitContext = createContext({
  habits: [],
  loading: false,
  error: null,
  createHabit: (habit) => {},
  removeHabit: (id) => {},
  updateHabit: (id, updatedHabit) => {},
  fetchHabits: () => {},
  clearHabits: () => {},
});

export default function HabitContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/habits");
      setHabits(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  async function createHabit(habit) {
    try {
      setError(null);
      const response = await axiosInstance.post("/create", habit);

      if (!response.data.habit) {
        setError("Habit is undefined");
      }
      setHabits([...habits, response.data.habit]);
    } catch (error) {
      setError(error.message);
    }
  }

  async function updateHabit(id, updatedHabit) {
    try {
      setError(null);
      await axiosInstance.patch("/update", { id, ...updatedHabit });
      setHabits(
        habits.map((habit) =>
          habit._id === id ? { ...habit, ...updatedHabit } : habit
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function removeHabit(id) {
    try {
      setError(null);
      await axiosInstance.delete("/delete", { data: { id } });
      setHabits(habits.filter((habit) => habit._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  function clearHabits() {
    setHabits([]);
  }

  const HabitContextData = {
    habits,
    error,
    loading,
    createHabit,
    removeHabit,
    updateHabit,
    fetchHabits,
    clearHabits,
  };

  return <HabitContext value={HabitContextData}>{children}</HabitContext>;
}
