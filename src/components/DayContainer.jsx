import './styles/dayContainer.css';
import { HourContainer } from './HourContainer';
import { toMinutes } from '../utils/timeUtils';

const START_HOUR = 9;
const END_HOUR = 20;
const INTERVAL = 30; // 30 minutos por fila
const TOTAL_ROWS = ((END_HOUR - START_HOUR) * 60) / INTERVAL; // 22 filas

export const DayContainer = ({ day }) => {
  const sortedSubjects = [...day.subjects].sort((a, b) =>
    toMinutes(a.startTime) - toMinutes(b.startTime)
  );

  return (
    <section className='truncate border-black border-4 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 min-w-[200px] max-h-[2000px] pb-5'>
      <header className="header-container bg-black text-white font-mono text-[1.3em] font-extrabold pl-2 py-1.5">
        <h2>{day.weekDay} {day.dia}/{day.mes}</h2>
      </header>

      {/* Grid de franjas horarias */}
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
            <div
              key={idx}
              style={{
                gridRowStart: startRow,
                gridRowEnd: `span ${durationSlots}`,
              }}
            >
              <HourContainer subject={subject} />
            </div>
          );
        })}
      </main>
    </section>
  );
};
