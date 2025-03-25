import './styles/dayContainer.css';
import { HourContainer } from './HourContainer';
import { generateHourSlots } from '../utils/hourUtils';
import { getDurationInMinutes } from '../utils/timeUtils';

export const DayContainer = ({ day }) => {
  const hourSlots = generateHourSlots(); // ["09:00", "10:00", ..., "19:00"]
  const renderedHours = [];

  const subjectMap = {};
  day.subjects.forEach(subject => {
    subjectMap[subject.startTime] = subject;
  });

  return (
    <section className='truncate border-black border-4 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 min-w-[200px] max-h-[860px]'>
      <header className="header-container bg-black text-white font-mono text-[1.3em] font-extrabold pl-2 py-1.5">
        <h2>{day.weekday} ({day.dia}/{day.mes})</h2>
      </header>
      <main className='py-2 flex flex-col items-center'>
        {hourSlots.map((hour, idx) => {
          if (renderedHours.includes(hour)) return null;

          const subject = subjectMap[hour];
          let isLast = idx === hourSlots.length - 1;

          if (subject) {
            const durationMin = getDurationInMinutes(subject.startTime, subject.endTime);
            const height = (durationMin / 60) * 60;
            const [startH] = hour.split(":").map(Number);
            const blocks = Math.ceil(durationMin / 60);

            for (let i = 1; i < blocks; i++) {
              const nextH = (startH + i).toString().padStart(2, "0") + ":00";
              renderedHours.push(nextH);
            }

            return <HourContainer key={idx} subject={subject} height={height} isLast={isLast} />;
          } else {
            return <HourContainer key={idx} subject={null} height={60} isLast={isLast} />;
          }
        })}
      </main>
    </section>
  );
};
