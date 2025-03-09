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
            <div className="flex flex-row justify-between items-center mb-[20px]">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white">PCEO Informática + Matemáticas</h1>
                <ThemeBtn>
                    Theme
                </ThemeBtn>
            </div>
            <section className='flex flex-row justify-between items-center gap-[1em]'>
                <div className="max-w-[30vw] flex flex-row justify-between gap-[1em] items-ce">
                    {years.map((year, index) => (
                        <MainBtn 
                            key={index}
                            label={year}
                            isActive={activeYear === index}
                            onClick={() => setActiveYear(index)}
                        ></MainBtn>
                    ))}
                </div>
                <div>
                    <WeekSelector/>
                </div>
            </section>
        </section>
    )
}
