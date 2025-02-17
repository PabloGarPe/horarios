"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { parse, format, startOfWeek } from 'date-fns';

interface ScheduleEntry {
  Day: string;
  Start: string;
  End: string;
  Subject: string;
  Room: string;
}

interface ProcessedEntry extends ScheduleEntry {
  Week: string;
}

function parseAndSortCSV(csvString: string): { [key: string]: ProcessedEntry[] } {
  // Parsear el CSV
  const parsedData = Papa.parse<ScheduleEntry>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  // Convertir y ordenar los datos
  const processedData = parsedData.data
    .filter(entry => entry.Day && entry.Start && entry.End) // Filtra registros incompletos
    .map((entry) => {
      try {
        const parsedDate = parse(entry.Day.trim(), "dd/MM/yyyy", new Date());
        if (isNaN(parsedDate.getTime())) {
          console.warn("Fecha inválida:", entry.Day);
          return null;
        }
        const weekStart = startOfWeek(parsedDate, { weekStartsOn: 1 }); // Lunes como inicio de semana

        return {
          ...entry,
          Day: format(parsedDate, "yyyy-MM-dd"), // Formato ISO para comparación correcta
          Week: format(weekStart, "yyyy-MM-dd"),
        };
      } catch (error) {
        console.error("Error al procesar entrada:", entry, error);
        return null;
      }
    })
    .filter((entry): entry is ProcessedEntry => entry !== null); // Eliminar entradas nulas

  // Ordenar por día y hora de inicio
  processedData.sort((a, b) => {
    const dateComparison = new Date(a.Day).getTime() - new Date(b.Day).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.Start.localeCompare(b.Start);
  });

  // Agrupar los datos por semana
  const groupedData: { [key: string]: ProcessedEntry[] } = {};
  processedData.forEach(entry => {
    if (!groupedData[entry.Week]) {
      groupedData[entry.Week] = [];
    }
    groupedData[entry.Week].push(entry);
  });

  return groupedData;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let h = 8; h < 21; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00-${h.toString().padStart(2, '0')}:30`);
    slots.push(`${h.toString().padStart(2, '0')}:30-${(h + 1).toString().padStart(2, '0')}:00`);
  }
  return slots;
};

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function Home() {
  const [schedule, setSchedule] = useState<{ [key: string]: ProcessedEntry[] }>({});
  const [currentWeek, setCurrentWeek] = useState<string>('');

  useEffect(() => {
    fetch('https://horarios-api-cx4p.onrender.com/horario')
      .then(response => response.text())
      .then(csv => {
        const grouped = parseAndSortCSV(csv);
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

  const timeSlots = generateTimeSlots();

  return (
    <div className="mt-32 p-4">
      <h1 className="text-xl font-bold mb-4">Semana del {currentWeek}</h1>
      <div className="mb-4">
        <button 
          onClick={() => handleWeekChange(-1)} 
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm"
        >
          Previous Week
        </button>
        <button 
          onClick={() => handleWeekChange(1)} 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Next Week
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2 border-b">Time</th>
            {daysOfWeek.map(day => (
              <th key={day} className="py-1 px-2 border-b">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={slot} className="border-b">
              <td className="py-1 px-2 border-r">{slot}</td>
              {daysOfWeek.map((day, colIndex) => {
                const dayEntries = schedule[currentWeek]?.filter(entry => {
                  const entryDate = new Date(entry.Day);
                  return entryDate.getDay() === colIndex + 1 && entry.Start === slot.split('-')[0];
                });
                if (dayEntries && dayEntries.length > 0) {
                  const entry = dayEntries[0];
                  const startTime = new Date(`1970-01-01T${entry.Start}:00`);
                  const endTime = new Date(`1970-01-01T${entry.End}:00`);
                  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 30); // 30-minute intervals
                  const rowSpan = Math.ceil(duration); // Round up to cover the full duration
                  return (
                    <td key={colIndex} rowSpan={rowSpan} className="py-1 px-2 bg-blue-100 border border-black">
                      {entry.Subject} <br /> {entry.Room}
                    </td>
                  );
                } else if (!schedule[currentWeek]?.some(entry => {
                  const entryDate = new Date(entry.Day);
                  const entryStartTime = new Date(`1970-01-01T${entry.Start}:00`);
                  const entryEndTime = new Date(`1970-01-01T${entry.End}:00`);
                  return entryDate.getDay() === colIndex + 1 && entryStartTime <= new Date(`1970-01-01T${slot.split('-')[0]}:00`) && entryEndTime > new Date(`1970-01-01T${slot.split('-')[0]}:00`);
                })) {
                  return <td key={colIndex} className="py-1 px-2 border-r"></td>;
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