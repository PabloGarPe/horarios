import React from 'react'

import './styles/headerNav.css'
import { WeekSelector } from './WeekSelector'
import { MainBtn } from './MainBtn'
import { ThemeBtn } from './ThemeBtn'
import { courses as courseOptions } from '../utils/courses';
import { UoInputBtn } from './UoInputBtn'


export const HeaderNav = ({
    courses,
    selectedCourse,
    onSelectCourse,
    selectedWeek,
    onSelectWeek,
    weeks,
    selectedUo,
    onUoSubmit,
}) => {
    const [uoInput, setUoInput] = React.useState(selectedUo || "");

    const selectCourse = (courseKey) => {
        onSelectCourse(courseKey);
        localStorage.setItem('selectedCourse', courseKey);
        localStorage.removeItem('selectedUo'); // Limpiar UO
    };

    // Opcional: Enter para confirmar
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUoSubmit();
        }
    };

    const handleUoSubmit = () => {
        if (uoInput.trim() !== "") {
            onUoSubmit(uoInput.trim());
            localStorage.setItem('selectedUo', uoInput.trim());
            onSelectCourse(null); // Desactivar curso
        }
    };

    const weekOptions = weeks.map(weekNum => {
        const label = typeof courses[selectedCourse]?.getWeekStartDate === 'function'
            ? courses[selectedCourse].getWeekStartDate(weekNum)
            : `Semana ${weekNum}`;
        return {
            value: weekNum,
            label
        };
    });

    return (
        <section className="flex flex-col bg-white border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:px-6 md:sticky top-0 z-10 dark:bg-gray-800" >
            <div className="flex flex-col md:flex-row justify-between items-center md:pb-[20px]">
                <h1 className="text-center md:text-start pb-5 md:pb-0 lg:text-3xl text-2xl font-extrabold font-mono dark:text-white">PCEO Informática + Matemáticas</h1>
                <div className='flex flex-row md:gap-[1em] gap-[0.5em] items-center justify-center md:justify-end'>
                    <UoInputBtn
                        value={uoInput}
                        onChange={setUoInput}
                        onSubmit={handleUoSubmit}
                        isActive={!!selectedUo && !selectedCourse}
                    />
                    <ThemeBtn>Theme</ThemeBtn>
                </div>
            </div>

            <section className="pt-5 md:pt-0 flex md:flex-row md:justify-between items-center md:gap-[1em] gap-[1.5em] flex-col">
                <div className="w-full overflow-x-auto whitespace-nowrap flex justify-center md:justify-start">
                    <div className="w-[100%] flex lg:gap-[1em] gap-[0.5em] justify-around md:justify-start items-center pt-[10px]">
                        {courseOptions.map((courseKey) => (
                            <MainBtn
                                key={courseKey}
                                label={`${courseKey}`}
                                isActive={selectedCourse === courseKey}
                                onClick={() => selectCourse(courseKey)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center w-full md:w-auto md:justify-end">
                    <WeekSelector
                        weeks={weekOptions}
                        selectedWeek={selectedWeek}
                        onSelectWeek={onSelectWeek}
                    />
                </div>
            </section>
        </section>
    );
};