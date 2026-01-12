export default function HabitButton({ toggleModal }) {
  return (
    <>
      <button
        onClick={toggleModal}
        className="p-2 m-4 border rounded-md text-lg"
      >
        + Create Habit
      </button>
    </>
  );
}
