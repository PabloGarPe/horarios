import React from 'react'

import { YearBtn } from './YearBtn'

import './styles/headerNav.css'

export const HeaderNav = ({ }) => {
    return (
        <section className="main-wrapper bg-white border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 sticky top-0 z-10" >
            <div className="title-div">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-mono">PCEO Informática + Matemáticas</h1>
                <button className="brutalist-button p-2 rounded-none border-4 border-black bg-white text-black hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Theme</button>
            </div>
            <div className="btns-div">
                <YearBtn year="1" />
                <YearBtn year="2" />
                <YearBtn year="3" />
                <YearBtn year="4" />
            </div>
        </section>
    )
}
