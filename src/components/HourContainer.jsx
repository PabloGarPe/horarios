import sampleLogo from '../images/sample-logo.svg';
import './styles/hourContainer.css';

export const HourContainer = ({ subject }) => {
    if (subject) {
        return (
            <section className='subject-section flex flex-col w-[90%] px-2 pt-1 pb-1 border-2'>
                <header className='flex flex-row justify-between items-center'>
                    <h1 className='font-mono text-sm font-medium'>HH:MM - HH:MM</h1>
                    <img src={sampleLogo} alt="sample logo" className='w-6' />
                </header>
                <main className='flex flex-row justify-between items-center pt-1'>
                    <h1 className='font-["Impact"] text-base font-semibold text-center'>
                        {subject}
                    </h1>
                    <h2 className='font-["Impact"] text-base text-center'>Aula</h2>
                </main>
            </section>
        )
    } else {
        return (
            <section className='subject-section--none flex flex-col w-[90%] px-2 pt-1 pb-1 border-2'>
                <header className='flex flex-row justify-between items-center'>
                    <h1 className='font-mono text-sm font-medium'>HH:MM - HH:MM</h1>
                    <img src={sampleLogo} alt="sample logo" className='w-6 invisible' />
                </header>
                <main className='flex flex-row justify-between items-center pt-1'>
                    <h1 className='font-["Impact"] text-base font-semibold text-center invisible'>
                        Mates
                    </h1>
                    <h2 className='font-["Impact"] text-base text-center invisible'>Aula</h2>
                </main>
            </section>
        )
    }
}