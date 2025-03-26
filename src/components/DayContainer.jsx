import './styles/dayContainer.css';
import { HourContainer } from './HourContainer';
import { generateTimeSlots } from '../utils/hourUtils';
import { getDurationInMinutes } from '../utils/timeUtils';

export const DayContainer = ({ day }) => {
  const TOTAL_DAY_MINUTES = 11 * 60; // de 9:00 a 20:00
  const GAP_SIZE_PX = 8;
  const PX_PER_MINUTE = 1;

  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const sortedSubjects = [...day.subjects].sort((a, b) =>
    toMinutes(a.startTime) - toMinutes(b.startTime)
  );

  const totalSubjectMinutes = sortedSubjects.reduce((sum, subj) => {
    return sum + getDurationInMinutes(subj.startTime, subj.endTime);
  }, 0);

  const numGaps = sortedSubjects.length > 0 ? sortedSubjects.length - 1 : 0;
  const totalGapHeight = numGaps * GAP_SIZE_PX;
  const totalGapMinutes = totalGapHeight / PX_PER_MINUTE;

  const remainingMinutes = TOTAL_DAY_MINUTES - totalSubjectMinutes - totalGapMinutes;
  const emptyHeight = remainingMinutes * PX_PER_MINUTE;

  const blocks = [];

  let currentTime = toMinutes("09:00");
  const endTime = toMinutes("20:00");

  sortedSubjects.forEach((subject) => {
    const subjectStart = toMinutes(subject.startTime);
    const subjectEnd = toMinutes(subject.endTime);

    if (subjectStart > currentTime) {
      const gap = subjectStart - currentTime;
      blocks.push({ type: 'empty', duration: gap });
    }

    blocks.push({ type: 'subject', subject, duration: subjectEnd - subjectStart });

    currentTime = subjectEnd;
  });

  if (currentTime < endTime) {
    blocks.push({ type: 'empty', duration: endTime - currentTime });
  }

  // Ajustar el primer hueco si hay diferencia
  const totalBlockDuration = blocks.reduce((sum, b) => sum + b.duration, 0);
  const diff = TOTAL_DAY_MINUTES - totalBlockDuration;

  if (diff > 0) {
    blocks.unshift({ type: 'empty', duration: diff });
  }

  return (
    <section className='truncate border-black border-4 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 min-w-[200px] max-h-[860px]'>
      <header className="header-container bg-black text-white font-mono text-[1.3em] font-extrabold pl-2 py-1.5">
        <h2>{day.weekday} {day.dia}/{day.mes}</h2>
      </header>
      <main className='py-2 flex flex-col items-center'>
        {blocks.map((block, idx) => {
          const height = block.duration * PX_PER_MINUTE;

          return (
            <HourContainer
              key={idx}
              subject={block.type === 'subject' ? block.subject : null}
              height={height}
            />
          );
        })}
      </main>
    </section>
  );
};

