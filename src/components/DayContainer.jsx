import './styles/dayContainer.css';
import { HourContainer } from './HourContainer';

export const DayContainer = () => {
    return (
        <section className='truncate border-black border-4 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700'>
            <header className="header-container bg-black text-white font-mono text-[1.3em] font-extrabold pl-2 py-1.5">
                <h2>DayName</h2>
            </header>
            <main className='py-2 flex flex-col gap-2 items-center'>
                <HourContainer subject={null}/>
                <HourContainer subject="Análisis I" />
                <HourContainer subject="Lengua" />
                <HourContainer />
                <HourContainer subject="Química" />
                <HourContainer />
                <HourContainer subject="Historia" />
                <HourContainer subject="Biología" />
                <HourContainer subject="Geografía" />
                <HourContainer />
                <HourContainer subject="Inglés" />
            </main>
        </section>
    )
}