import { useContext } from "react";
import { HabitContext } from "../store/habitContext";
import Input from "./Input";

export default function ModalForm({ toggleModal }) {
  const { createHabit } = useContext(HabitContext);

  async function handleCreateHabit(formData) {
    const habitData = Object.fromEntries(formData.entries());

    try {
      await createHabit({
        title: habitData.title,
        description: habitData.description || "",
      });

      toggleModal();
    } catch (error) {
      console.error("Failed to create habit", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Habit</h2>
          <button
            onClick={toggleModal}
            className="text-gray-500 not-[]:text-2xl"
            type="button"
          >
            ×
          </button>
        </div>

        <form action={handleCreateHabit}>
          <Input type="text" label="Habit Title" id="title" />
          <Input type="text" label="Description (optional)" id="description" />

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold"
            >
              Create Habit
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
