import { useContext } from "react";
import { HabitContext } from "../store/habitContext";
import Input from "./Input";

export default function ModalForm({ toggleModal, editHabit }) {
  const { createHabit, updateHabit } = useContext(HabitContext);

  async function handleSubmit(formData) {
    const habitData = Object.fromEntries(formData.entries());

    try {
      if (!editHabit) {
        await createHabit({
          title: habitData.title,
          description: habitData.description || "",
          color: habitData.color || "white",
        });
      } else {
        await updateHabit(editHabit._id, {
          title: habitData.title,
          description: habitData.description || "",
          color: habitData.color || "white",
        });
      }

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
            className="text-gray-500 text-2xl"
            type="button"
          >
            ×
          </button>
        </div>

        <form action={handleSubmit}>
          <Input
            type="text"
            label="Habit Title"
            id="title"
            required={true}
            defaultValue={editHabit?.title || ""}
          />
          <Input
            type="text"
            label="Description (optional)"
            id="description"
            required={false}
            defaultValue={editHabit?.description || ""}
          />
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold text-left" htmlFor="color">
              Color
            </label>
            <input
              id="color"
              name="color"
              type="color"
              defaultValue={editHabit?.color || "#ffffff"}
              className="h-12 w-full"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold"
            >
              {editHabit ? "Update Habit" : "Create Habit"}
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
