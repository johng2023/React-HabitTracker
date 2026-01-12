import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import Calendar from "./Calendar";

export default function StatsModal({ stats, closeStats }) {
  const [completions, setCompletions] = useState(null);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axiosInstance.get(
          `/completions/${stats._id}/stats`
        );
        setCompletions(response.data.totalCompletions);
        setStreak(response.data.currentStreak);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStats();
  }, [stats._id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">{stats.title}</h1>
          <p className="text-lg">{stats.description || ""}</p>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-sm mb-1">Total Completions</div>
            <div className="text-3xl font-bold">{completions ?? "—"}</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-sm mb-1">Current Streak</div>
            <div className="text-3xl font-bold">{streak ?? "—"} 🔥</div>
          </div>
        </div>

        <div className="mb-4">
          <Calendar habit={stats}></Calendar>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={closeStats}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
