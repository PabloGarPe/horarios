"use client";
import { useState, useEffect } from "react";
import { parseAndSortCSV } from "@/src/parseCsv";
import { ProcessedEntry } from "@/src/interface";
import { generateTimeSlots } from "@/src/util";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function Home() {
  const [schedule, setSchedule] = useState<{ [key: string]: ProcessedEntry[] }>(
    {}
  );
  const [currentWeek, setCurrentWeek] = useState<string>("");

  useEffect(() => {
    fetch("https://horarios-api-cx4p.onrender.com/horario")
      .then((response) => response.text())
      .then((csv) => {
        const grouped = parseAndSortCSV(csv);
        setSchedule(grouped);
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysToMonday = (dayOfWeek + 6) % 7;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysToMonday);
        const currentWeek = monday.toISOString().split("T")[0];
        setCurrentWeek(currentWeek);
      });
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handleWeekChange(-1);
    } else if (event.key === "ArrowRight") {
      handleWeekChange(1);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentWeek,schedule])

  const handleWeekChange = (direction: number) => {
    const weeks = Object.keys(schedule);
    const currentIndex = weeks.indexOf(currentWeek);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < weeks.length) {
      setCurrentWeek(weeks[newIndex]);
    }
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="mt-32 p-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-xl font-bold mb-4">Semana del {currentWeek}</h1>
        <div className="mb-4">
            <button
            onClick={() => handleWeekChange(-1)}
            className={`bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm ${
              currentWeek === Object.keys(schedule)[0]
              ? "opacity-50 cursor-not-allowed"
              : ""
            }`}
            >
            Previous Week
            </button>
          <button
            onClick={() => handleWeekChange(1)}
            className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm ${
              currentWeek ===
              Object.keys(schedule)[Object.keys(schedule).length - 1]
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next Week
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-black text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2 border-b border-black">Time</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="py-1 px-2 border-b border-black">
                {day}{" "}
                <span className="text-divs-300">
                  {new Date(
                    new Date(currentWeek).setDate(
                      new Date(currentWeek).getDate() + daysOfWeek.indexOf(day)
                    )
                  ).getDate()}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={slot} className="">
              <td className="py-1 px-2 border border-black max-w-3">{slot}</td>
              {daysOfWeek.map((day, colIndex) => {
                const dayEntries = schedule[currentWeek]?.filter((entry) => {
                  const entryDate = new Date(entry.Day);
                  return (
                    entryDate.getDay() === colIndex + 1 &&
                    entry.Start === slot.split("-")[0]
                  );
                });
                if (dayEntries && dayEntries.length > 0) {
                  const entry = dayEntries[0];
                  const startTime = new Date(`1970-01-01T${entry.Start}:00`);
                  const endTime = new Date(`1970-01-01T${entry.End}:00`);
                  const duration =
                    (endTime.getTime() - startTime.getTime()) /
                    (1000 * 60 * 30); // 30-minute intervals
                  const rowSpan = Math.ceil(duration); // Round up to cover the full duration
                  return (
                    <td
                      key={colIndex}
                      rowSpan={rowSpan}
                      className={`py-1 px-2 text-center align-middle font-semibold border border-black lg:w-[18rem] ${
                        entry.Room.toLowerCase().includes("ex")
                          ? "bg-red-300"
                          : "bg-divs-100"
                      }`}
                    >
                      {entry.Subject} <br /> {entry.Room}
                    </td>
                  );
                } else if (
                  !schedule[currentWeek]?.some((entry) => {
                    const entryDate = new Date(entry.Day);
                    const entryStartTime = new Date(
                      `1970-01-01T${entry.Start}:00`
                    );
                    const entryEndTime = new Date(`1970-01-01T${entry.End}:00`);
                    return (
                      entryDate.getDay() === colIndex + 1 &&
                      entryStartTime <=
                        new Date(`1970-01-01T${slot.split("-")[0]}:00`) &&
                      entryEndTime >
                        new Date(`1970-01-01T${slot.split("-")[0]}:00`)
                    );
                  })
                ) {
                  return (
                    <td
                      key={colIndex}
                      className="py-1 px-2 border border-black"
                    ></td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
