import React from 'react';
import './styles/weekNavigationButtons.css';

export const WeekNavigationButtons = ({ weeks = [], selectedWeek, onSelectWeek }) => {
  const weekIds = weeks.map(week => Number(week.value));
  const currentWeekIndex = weekIds.indexOf(Number(selectedWeek));

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      onSelectWeek(weekIds[currentWeekIndex - 1]);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weekIds.length - 1) {
      onSelectWeek(weekIds[currentWeekIndex + 1]);
    }
  };

  const isPreviousDisabled = currentWeekIndex <= 0;
  const isNextDisabled = currentWeekIndex >= weekIds.length - 1;

  return (
    <>
      {/* Botón Anterior - Lado Izquierdo */}
      <button
        onClick={handlePreviousWeek}
        disabled={isPreviousDisabled}
        className={`week-navigation-btn fixed left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black 
          flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] 
          hover:translate-x-0 hover:translate-y-0 transition-all opacity-25 hover:opacity-100 focus:opacity-100
          ${isPreviousDisabled ? 'opacity-10 cursor-not-allowed hover:opacity-10' : 'cursor-pointer'}
          dark:bg-gray-800 dark:text-white z-20`}
        aria-label="Semana anterior"
        title="Semana anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Botón Siguiente - Lado Derecho */}
      <button
        onClick={handleNextWeek}
        disabled={isNextDisabled}
        className={`week-navigation-btn fixed right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black 
          flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
          hover:translate-x-0 hover:translate-y-0 hover:opacity-100 transition-all -translate-x-1 -translate-y-1 opacity-25 hover:opacity-100 focus:opacity-100
          ${isNextDisabled ? 'opacity-10 cursor-not-allowed hover:opacity-10' : 'cursor-pointer'}
          dark:bg-gray-800 dark:text-white z-20`}
        aria-label="Semana siguiente"
        title="Semana siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
};