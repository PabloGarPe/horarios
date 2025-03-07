import './styles/hourContainer.css';
import { subjectColors, defaultColor } from '../utils/subjectColors.js'
import { subjectLogos, sampleLogo } from '../utils/subjectLogos.js';

const normalizeSubjectName = (subject) => {
    if (!subject) return '';
    return subject.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const HourContainer = ({ subject }) => {
    
    const logoImgSrc = (subject) => {
        const normalizedSubject = normalizeSubjectName(subject);
        return subjectLogos[normalizedSubject] || sampleLogo;
    };

    if (subject) {
        return (
            <section className={`flex flex-col w-[90%] px-2 pt-1 pb-1 border-2 ${subjectColors[subject] || defaultColor}`}>
                <header className='flex flex-row justify-between items-center'>
                    <h1 className='font-mono text-sm font-medium dark:text-white'>HH:MM - HH:MM</h1>
                    <img src={logoImgSrc(subject)} alt={`${subject} logo`} className='w-5 pb-1' />
                </header>
                <main className='flex flex-row justify-between items-center pt-1'>
                    <h1 className='font-serif text-base font-semibold text-center  dark:text-white'>
                        {subject}
                    </h1>
                    <h2 className='font-serif text-base text-center  dark:text-white'>Aula</h2>
                </main>
            </section>
        )
    } else {
        return (
            <section className='subject-section--none flex flex-col w-[90%] px-2 pt-1 pb-1 border-2'>
                <header className='flex flex-row justify-between items-center'>
                    <h1 className='font-mono text-sm font-medium  dark:text-white'>HH:MM - HH:MM</h1>
                    <img src={logoImgSrc()} alt="sample logo" className='w-6 invisible' />
                </header>
                <main className='flex flex-row justify-between items-center pt-1'>
                    <h1 className='font-serif text-base font-semibold text-center invisible'>
                        Mates
                    </h1>
                    <h2 className='font-serif text-base text-center invisible'>Aula</h2>
                </main>
            </section>
        )
    }
}