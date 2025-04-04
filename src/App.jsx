import { useEffect, useState } from "react";
import { DayContainer } from "./components/DayContainer";
import { HeaderNav } from "./components/HeaderNav";
import { FooterEnd } from "./components/FooterEnd";
import { exitFetch } from "./utils/fetcher";
import { parseSubjectsToYears } from "./utils/dataParser";
import { getISOWeek } from 'date-fns';

function App() {
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(parseInt(localStorage.getItem('selectedCourse')) || 2);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const currentWeek = getISOWeek(new Date()); // Semana actual real
    const availableWeeks = Object.keys(courses[selectedCourse]?.weeks || {}).map(Number).sort((a, b) => a - b);
  
    if (availableWeeks.length > 0) {
      // Si la semana actual existe entre las disponibles, la usamos
      if (availableWeeks.includes(currentWeek)) {
        setSelectedWeek(currentWeek);
      } else {
        // Si no, usamos la primera semana que haya
        setSelectedWeek(availableWeeks[0]);
      }
    }
  }, [courses, selectedCourse]);


  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        const data = await exitFetch(selectedCourse);
        if (data.subjects.length === 0) {
          setLoading(false);
          return;
        }
  
        const courseMap = parseSubjectsToYears(data.subjects);
  
        setCourses((prev) => {
          const prevCourse = prev[selectedCourse];
        
          const newCourseInstance = courseMap[selectedCourse];
        
          // Si ya hay curso, combinamos las semanas en el mismo objeto
          if (prevCourse) {
            Object.entries(newCourseInstance.weeks || {}).forEach(([weekNum, week]) => {
              prevCourse.weeks[weekNum] = week;
            });
        
            return {
              ...prev,
              [selectedCourse]: prevCourse // <- mantenemos la instancia original (clase Year)
            };
          }
        
          // Si no había, usamos el nuevo directamente (que sí es una instancia Year)
          return {
            ...prev,
            [selectedCourse]: newCourseInstance
          };
        });
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchAndParse();
  }, [selectedCourse])

  const week = courses[selectedCourse]?.getWeek(Number(selectedWeek));
  const days = week?.getSortedDays() || [];


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        if (courses[selectedCourse]?.weeks[selectedWeek + 1] === undefined) return;
        setSelectedWeek((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft') {
        if (courses[selectedCourse]?.weeks[selectedWeek - 1] === undefined) return;
        setSelectedWeek((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWeek, courses]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Cargando horarios...</p>;
  
  const weekOptions = Object.keys(courses[selectedCourse]?.weeks || {}).map(
    (weekNum) => {
      const label = typeof courses[selectedCourse]?.getWeekStartDate === 'function'
        ? courses[selectedCourse].getWeekStartDate(weekNum)
        : `Semana ${weekNum}`;
      return {
        value: weekNum,
        label: label || `Semana ${weekNum}`,
      };
    }
  );



  return (
    <>
      <HeaderNav
        courses={courses} // ej: [1, 2, 3, 4]
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
        weeks={weekOptions}
      />

      <main
        id="main-container"
        className="pt-3 px-5 pb-5 flex flex-row justify-between bg-[#FFF6DA] dark:bg-gray-700 overflow-x-auto max-w-full space-x-8"
      >
        {courses[selectedCourse]?days.map((day, idx) => (
          <DayContainer key={idx} day={day} />
        )):<p className="text-center mt-10 text-4xl dark:text-white">No hay horarios para esta semana</p>}
      </main>

      <FooterEnd />
    </>
  );
}

export default App;
