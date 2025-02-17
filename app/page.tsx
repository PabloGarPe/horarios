"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface ScheduleEntry {
  Day: string;
  Start: string;
  End: string;
  Subject: string;
  Room: string;
}

const groupByWeek = (data: ScheduleEntry[]) => {
  const weeks: { [key: string]: ScheduleEntry[] } = {};
  data.forEach(entry => {
    const date = new Date(entry.Day);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    if (!weeks[week]) {
      weeks[week] = [];
    }
    weeks[week].push(entry);
  });
  return weeks;
};

export default function Home() {
  const [schedule, setSchedule] = useState<{ [key: string]: ScheduleEntry[] }>({});
  const [currentWeek, setCurrentWeek] = useState<string>('');

  useEffect(() => {
    fetch('/api/data/horario.csv')
      .then(response => response.text())
      .then(csv => {
        const parsed = Papa.parse<ScheduleEntry>(csv, { header: true });
        const grouped = groupByWeek(parsed.data);
        setSchedule(grouped);
        setCurrentWeek(Object.keys(grouped)[0]);
      });
  }, []);

  const handleWeekChange = (direction: number) => {
    const weeks = Object.keys(schedule);
    const currentIndex = weeks.indexOf(currentWeek);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < weeks.length) {
      setCurrentWeek(weeks[newIndex]);
    }
  };

  return (
    <div>
      <h1>Schedule for {currentWeek}</h1>
      <button onClick={() => handleWeekChange(-1)}>Previous Week</button>
      <button onClick={() => handleWeekChange(1)}>Next Week</button>
      <ul>
        {schedule[currentWeek]?.map((entry, index) => (
          <li key={index}>
            {entry.Day} {entry.Start}-{entry.End} {entry.Subject} {entry.Room}
          </li>
        ))}
      </ul>
    </div>
  );
}
