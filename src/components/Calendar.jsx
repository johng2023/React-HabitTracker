import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";

export default function Calendar({ habit }) {
  const [completions, setCompletions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchCompletions() {
      try {
        const response = await axiosInstance.get(`/completions/${habit._id}`);
        setCompletions(response.data.completions);
        console.log(response.data.completions);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompletions();
  }, [habit._id]);

  function hasCompletion(date) {
    const dateString = date.toISOString().split("T")[0];
    return completions.some(
      (completion) =>
        new Date(completion.completedDate).toISOString().split("T")[0] ===
        dateString
    );
  }

  function getCalendarDays() {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    return days;
  }

  const days = getCalendarDays();

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((date, index) => {
        const completed = hasCompletion(date);
        return (
          <div
            key={index}
            className={`p-2 border rounded ${completed ? "bg-green-500" : ""}`}
          >
            {date.getDate()}
          </div>
        );
      })}
    </div>
  );
}
