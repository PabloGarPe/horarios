import { DayContainer } from './components/DayContainer'
import { HeaderNav } from './components/HeaderNav'
import { FooterEnd } from './components/FooterEnd'
import { exitFetch } from './utils/fetcher'

function App() {

  

  return (
    <>
      <HeaderNav />
      <main className="pt-3 px-5 pb-5 flex flex-row justify-between dark:bg-gray-700 overflow-x-auto max-w-full space-x-8">
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
