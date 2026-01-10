import { createPortal } from "react-dom";
import ModalForm from "./ModalForm";

export default function HabitButton({ toggleModal, showModal, editHabit }) {
  return (
    <>
      <button
        onClick={toggleModal}
        className="p-2 m-4 border rounded-md text-lg"
      >
        + Create Habit
      </button>

      {showModal &&
        createPortal(
          <ModalForm
            toggleModal={toggleModal}
            editHabit={editHabit}
          ></ModalForm>,
          document.getElementById("modal")
        )}
    </>
  );
}
