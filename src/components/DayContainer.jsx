import './styles/dayContainer.css';
import { HourContainer } from './HourContainer';
import { toMinutes } from '../utils/timeUtils';
import { motion } from 'framer-motion'; // ✅ solo necesitas `motion`

const START_HOUR = 9;
const END_HOUR = 20;
const INTERVAL = 30;
const TOTAL_ROWS = ((END_HOUR - START_HOUR) * 60) / INTERVAL;

export const DayContainer = ({ day }) => {
  const sortedSubjects = [...day.subjects].sort((a, b) =>
    toMinutes(a.startTime) - toMinutes(b.startTime)
  );

  return (
    <section className='truncate border-black border-4 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 min-w-[200px] max-h-[2000px] pb-5'>
      <header className="header-container bg-black text-white font-mono text-[1.3em] font-extrabold pl-2 py-1.5">
        <h2>{day.weekDay} {day.dia}/{day.mes}</h2>
      </header>

      <main
        className="grid w-full px-2 gap-y-2 pt-5"
        style={{
          gridTemplateRows: `repeat(${TOTAL_ROWS}, 30px)`,
        }}
      >
        {sortedSubjects.map((subject, idx) => {
          const start = toMinutes(subject.startTime);
          const end = toMinutes(subject.endTime);
          const startRow = Math.floor((start - START_HOUR * 60) / INTERVAL) + 1;
          const durationSlots = (end - start) / INTERVAL;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              style={{
                gridRowStart: startRow,
                gridRowEnd: `span ${durationSlots}`,
              }}
            >
              <HourContainer subject={subject} />
            </motion.div>
          );
        })}
      </main>
    </section>
  );
};
