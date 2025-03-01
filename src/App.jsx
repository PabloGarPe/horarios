import { DayContainer } from './components/DayContainer'
import { HeaderNav } from './components/HeaderNav'

function App() {

  return (
    <>
      <HeaderNav />
      <main className="py-5 px-5 flex flex-row justify-between">
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
        <DayContainer/>
      </main>
    </>
  )
}

export default App
