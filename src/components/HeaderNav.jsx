import React from 'react'

import './styles/headerNav.css'
import { WeekSelector } from './WeekSelector'
import { MainBtn } from './MainBtn'
import { ThemeBtn } from './ThemeBtn'

export const HeaderNav = ({ }) => {
    return (
        <section className="main-wrapper bg-white border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:px-6 sticky top-0 z-10 dark:bg-gray-800" >
            <div className="title-div">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white">PCEO Informática + Matemáticas</h1>
                <ThemeBtn>
                    Theme
                </ThemeBtn>
            </div>
            <section className='inf-wrapper'>
                <div className="btns-div">
                    <MainBtn>
                        Year 1
                    </MainBtn>
                    <MainBtn>
                        Year 2
                    </MainBtn>
                    <MainBtn>
                        Year 3
                    </MainBtn>
                    <MainBtn>
                        Year 4
                    </MainBtn>
                </div>
                <div>
                    <WeekSelector/>
                </div>
            </section>
        </section>
    )
}
