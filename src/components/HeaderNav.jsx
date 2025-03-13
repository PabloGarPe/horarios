import React from 'react'

import './styles/headerNav.css'
import { WeekSelector } from './WeekSelector'
import { MainBtn } from './MainBtn'
import { ThemeBtn } from './ThemeBtn'
import { useState } from 'react'
import { years } from '../utils/years.js'

export const HeaderNav = ({ }) => {

    const [activeYear, setActiveYear] = useState(0);

    return (
        <section className="flex flex-col bg-white border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:px-6 sticky top-0 z-10 dark:bg-gray-800" >
            <div className="flex flex-col md:flex-row justify-between items-center md:pb-[20px]">
                <h1 className="text-center md:text-start pb-5 md:pb-0 lg:text-3xl text-2xl font-extrabold font-mono dark:text-white">PCEO Informática + Matemáticas</h1>
                <ThemeBtn>
                    Theme
                </ThemeBtn>
            </div>
            <section className="pt-5 md:pt-0 flex md:flex-row md:justify-between items-center md:gap-[1em] gap-[1.5em] flex-col">
                {/* Contenedor con scroll horizontal solo para los botones */}
                <div className="w-full overflow-x-auto whitespace-nowrap flex justify-center md:justify-start">
                    <div className="flex lg:gap-[1em] gap-[0.5em] items-center pt-[10px] pl-4 md:pl-0 pr-4">
                        {years.map((year, index) => (
                            <MainBtn
                                key={index}
                                label={year}
                                isActive={activeYear === index}
                                onClick={() => setActiveYear(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Contenedor del selector de semana, centrado en vista de columna */}
                <div className="flex justify-center w-full md:w-auto md:justify-end">
                    <WeekSelector />
                </div>
            </section>

        </section>
    )
}
