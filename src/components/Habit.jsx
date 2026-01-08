export default function Habit({ habit }) {
  return (
    <div className="w-52 rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-slate-900">{habit.title}</h2>
      {habit.description ? (
        <p className="text-sm text-slate-600 leading-relaxed">
          {habit.description}
        </p>
      ) : null}
    </div>
  );
}
