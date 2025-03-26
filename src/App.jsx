import { useEffect, useState } from "react";
import { DayContainer } from "./components/DayContainer";
import { HeaderNav } from "./components/HeaderNav";
import { FooterEnd } from "./components/FooterEnd";
import { exitFetch } from "./utils/fetcher";
import { parseSubjectsToYears } from "./utils/dataParser";

function App() {
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(parseInt(localStorage.getItem('selectedCourse')) || 2);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        const data = await exitFetch(selectedCourse);
        if (data.subjects.length === 0){
          setLoading(false);
          return;
        }
        const courseMap = parseSubjectsToYears(data.subjects);
        setCourses((prev) => ({ ...prev, ...courseMap }));

        const defaultWeek = Object.keys(courseMap[selectedCourse].weeks)[0];
        setSelectedWeek(defaultWeek);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };

    fetchAndParse();

  }, [selectedCourse]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Cargando horarios...</p>;

  const week = courses[selectedCourse]?.getWeek(Number(selectedWeek));
  const days = week?.getSortedDays() || [];

  const weekOptions = Object.keys(courses[selectedCourse]?.weeks || {}).map(
    (weekNum) => {
      const label = courses[selectedCourse].getWeekStartDate(weekNum);
      return {
        value: weekNum,
        label: label || `Semana ${weekNum}`,
      };
    }
  );

  return (
    <>
      <HeaderNav
        courses={Object.keys(courses)} // ej: [1, 2, 3, 4]
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
        weeks={weekOptions}
      />

      <main
        id="main-container"
        className="pt-3 px-5 pb-5 flex flex-row justify-between dark:bg-gray-700 overflow-x-auto max-w-full space-x-8"
      >
        {courses[selectedCourse]?days.map((day, idx) => (
          <DayContainer key={idx} day={day} />
        )):<p className="text-center mt-10 text-lg">No hay horarios para esta semana</p>}
      </main>

      <FooterEnd />
    </>
  );
}

export default App;
