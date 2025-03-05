import { DayContainer } from './components/DayContainer'
import { HeaderNav } from './components/HeaderNav'
import { FooterEnd } from './components/FooterEnd'

function App() {

  return (
    <>
      <HeaderNav />
      <main className="pt-3 px-5 pb-5 flex flex-row justify-between">
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
