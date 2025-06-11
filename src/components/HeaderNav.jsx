import React, { useEffect, useState } from 'react';
import './styles/headerNav.css';
import { WeekSelector } from './WeekSelector';
import { MainBtn } from './MainBtn';
import { ThemeBtn } from './ThemeBtn';
import { UoInputBtn } from './UoInputBtn';
import { SemesterSelector } from './SemesterSelector';
import { TitBtn } from './TitBtn';

export const HeaderNav = ({
  courses,
  selectedWeek,
  onSelectWeek,
  weeks,
  selectedSemester,
  onSelectSemester,
  userSource,
  onSelectCourseSimulado,
  onUoSubmit,
  onChangeTit,
  titulacion,
  cursos = [] // Valor por defecto
}) => {
  const [uoInput, setUoInput] = useState(userSource || "");

  // ✅ Sincroniza el input con el userSource al refrescar
  useEffect(() => {
    setUoInput(userSource || "");
  }, [userSource]);

  const handleUoSubmit = () => {
    if (uoInput.trim() !== "") {
      onUoSubmit(uoInput.trim());
    }
  };

  return (
    <nav className="flex flex-col bg-white border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:px-6 md:sticky top-0 z-10 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center md:pb-[20px]">
        <h1 className="text-center md:text-start pb-5 md:pb-0 lg:text-3xl text-2xl font-extrabold font-mono dark:text-white">
          {titulacion}
        </h1>
        <div className='flex flex-row md:gap-[1em] gap-[0.5em] items-center justify-center md:justify-end'>
          <UoInputBtn
            value={uoInput}
            onChange={setUoInput}
            onSubmit={handleUoSubmit}
          />
          <TitBtn onChangeTit={onChangeTit}> Titulación </TitBtn>
          <ThemeBtn>Theme</ThemeBtn>
        </div>
      </div>

      <section className="pt-5 md:pt-0 flex md:flex-row md:justify-between items-center md:gap-[1em] gap-[1.5em] flex-col">
        <div className="w-full overflow-x-auto whitespace-nowrap flex justify-center md:justify-start">
          <div className="w-[100%] flex lg:gap-[1em] gap-[0.5em] justify-around md:justify-start items-center pt-[10px]">
            {Array.isArray(cursos) && cursos.map((curso) => (
              <MainBtn
                key={curso.value}
                label={curso.label}
                onClick={() => onSelectCourseSimulado(curso.value)}
                isActive={userSource === curso.value} // Añade esta línea
              >
                {curso.label}
              </MainBtn>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full md:w-auto md:justify-end">
          <SemesterSelector
            courses={courses}
            selectedSemester={selectedSemester}
            onSelectSemester={onSelectSemester}
          />
          <WeekSelector
            weeks={weeks}
            selectedWeek={selectedWeek}
            onSelectWeek={onSelectWeek}
          />
        </div>
      </section>
    </nav>
  );
};
