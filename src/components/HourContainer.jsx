import './styles/hourContainer.css';
import './styles/scrollingText.css'; // Asegúrate de importar tu animación
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { extractSubjectKey } from '../utils/subjectParser.js';
import { subjectLogos, sampleLogo } from '../utils/subjectLogos';
import { subjectColors, defaultColor } from '../utils/subjectColors.js';


export const HourContainer = ({ subject, height = '100%' }) => {
  const subjectKey = extractSubjectKey(subject?.name);
  const colorClass = subjectColors[subjectKey] || defaultColor;

  const logoImgSrc = (subjectName) => {
    const key = extractSubjectKey(subjectName);
    return subjectLogos[key] || sampleLogo;
  };

  const containerStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: '100%',
  };

  // 👇 Aquí detectamos overflow en el subject name
  const nameRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      setIsOverflowing(nameRef.current.scrollWidth > nameRef.current.clientWidth);
    }
  }, [subject?.name]);

  if (subject) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={containerStyle}
        className={`flex flex-col justify-between w-full px-2 pt-1 pb-1 border-2 ${colorClass}`}
      >
        <header className="flex flex-row justify-between items-center">
          <h1 className="font-mono text-sm font-medium dark:text-white">
            {subject.startTime} - {subject.endTime}
          </h1>
          <img
            src={logoImgSrc(subject.name)}
            alt={`${subject.name} logo`}
            className="w-5 pb-1"
          />
        </header>

        <main className="flex flex-row justify-between items-center mt-auto pt-1 gap-2">
  <div className="relative w-[70%] overflow-hidden h-[1.25rem]"> {/* Fijamos altura */}
    <div
      ref={nameRef}
      className={`absolute left-0 font-sans text-base font-bold text-center dark:text-white whitespace-nowrap ${
        isOverflowing ? 'scrolling-text' : ''
      }`}
    >
      {subject.name}
    </div>
  </div>
  <h2 className="font-sans text-base text-right dark:text-white w-[35%] truncate">
    {subject.classroom}
  </h2>
</main>
      </motion.section>
    );
  } else {
    // bloque vacío
    return (
      <section
        style={containerStyle}
        className='subject-section--none flex flex-col px-2 pt-1 pb-1 border-2 bg-transparent'
      >
        <header className='flex flex-row justify-between items-center'>
          <h1 className='font-mono text-sm font-medium dark:text-white opacity-0'>HH:MM - HH:MM</h1>
          <img src={logoImgSrc()} alt="sample logo" className='w-5 invisible' />
        </header>
        <main className='flex flex-row justify-between items-center pt-1'>
          <h1 className='font-sans text-base font-bold text-center invisible'>Mates</h1>
          <h2 className='font-sans text-base text-center invisible'>Aula</h2>
        </main>
      </section>
    );
  }
};
