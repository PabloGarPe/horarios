import './styles/hourContainer.css';
import { subjectColors, defaultColor } from '../utils/subjectColors.js'
import { subjectLogos, sampleLogo } from '../utils/subjectLogos.js';

const normalizeSubjectName = (subject) => {
  if (!subject) return '';
  return subject.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const HourContainer = ({ subject, height = 30, isLast = false }) => {
  const logoImgSrc = (subjectName) => {
    const normalized = normalizeSubjectName(subjectName);
    return subjectLogos[normalized] || sampleLogo;
  };

  const containerStyle = {
    height: `${height}px`,
    marginBottom: isLast ? "0px" : "8px" // simula el gap
  };

  if (subject) {
    return (
      <section
        style={containerStyle}
        className={`flex flex-col w-[90%] px-2 pt-1 pb-1 border-2 ${subjectColors[subject.name] || defaultColor}`}
      >
        <header className='flex flex-row justify-between items-center'>
          <h1 className='font-mono text-sm font-medium dark:text-white'>
            {subject.startTime} - {subject.endTime}
          </h1>
          <img src={logoImgSrc(subject.name)} alt={`${subject.name} logo`} className='w-5 pb-1' />
        </header>
        <main className='flex flex-row justify-between items-center pt-1'>
          <h1 className='font-sans text-base font-bold text-center dark:text-white'>
            {subject.name}
          </h1>
          <h2 className='font-sans text-base text-center dark:text-white'>
            {subject.classroom}
          </h2>
        </main>
        </section>
    );
  } else {
    return (
      <section style={containerStyle} className='subject-section--none flex flex-col w-[90%] px-2 pt-1 pb-1 border-2'>
        <header className='flex flex-row justify-between items-center'>
          <h1 className='font-mono text-sm font-medium dark:text-white'>HH:MM - HH:MM</h1>
          <img src={logoImgSrc()} alt="sample logo" className='w-6 invisible' />
        </header>
        <main className='flex flex-row justify-between items-center pt-1'>
          <h1 className='font-sans text-base font-bold text-center invisible'>Mates</h1>
          <h2 className='font-sans text-base text-center invisible'>Aula</h2>
        </main>
      </section>
    );
  }
};