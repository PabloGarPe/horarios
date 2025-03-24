import { DayContainer } from './components/DayContainer'
import { HeaderNav } from './components/HeaderNav'
import { FooterEnd } from './components/FooterEnd'
import { generateDays } from './utils/dataParser'

function App() {

  return (
    <>
      <HeaderNav />
      <main id="main-container" className="pt-3 px-5 pb-5 flex flex-row justify-between dark:bg-gray-700 overflow-x-auto max-w-full space-x-8">
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
      </main>
      <FooterEnd/>
    </>
  )
}

export default App
