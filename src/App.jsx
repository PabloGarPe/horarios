import { useEffect, useState } from "react";
import { DayContainer } from "./components/DayContainer";
import { HeaderNav } from "./components/HeaderNav";
import { FooterEnd } from "./components/FooterEnd";
import { exitFetch } from "./utils/fetcher";
import { parseSubjectsToYears } from "./utils/dataParser";
import { getISOWeek } from "date-fns";

function App() {
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(
    parseInt(localStorage.getItem("selectedCourse")) || null
  );
  const [selectedUo, setSelectedUo] = useState(localStorage.getItem("selectedUo") || null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [loading, setLoading] = useState(true);

  const selectedKey = selectedCourse ?? selectedUo;

  // Establecer semana por defecto al cambiar el curso/UO
  useEffect(() => {
    const currentWeek = getISOWeek(new Date());
    const availableWeeks = Object.keys(courses[selectedKey]?.weeks || {})
      .map(Number)
      .sort((a, b) => a - b);

    if (availableWeeks.length > 0) {
      if (availableWeeks.includes(currentWeek)) {
        setSelectedWeek(currentWeek);
      } else {
        setSelectedWeek(availableWeeks[0]);
      }
    }
  }, [courses, selectedKey]);

  // Cargar datos al seleccionar curso o UO
  useEffect(() => {
    if (!selectedKey) return;

    const fetchAndParse = async () => {
      setLoading(true);
      try {
        const data = await exitFetch(selectedKey);
        if (data.subjects.length === 0) {
          setLoading(false);
          return;
        }

        const courseMap = parseSubjectsToYears(data.subjects);
        const newCourseInstance = courseMap[selectedKey];

        setCourses((prev) => {
          const prevCourse = prev[selectedKey];

          if (prevCourse) {
            Object.entries(newCourseInstance.weeks || {}).forEach(([weekNum, week]) => {
              prevCourse.weeks[weekNum] = week;
            });

            return {
              ...prev,
              [selectedKey]: prevCourse,
            };
          }

          return {
            ...prev,
            [selectedKey]: newCourseInstance,
          };
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAndParse();
  }, [selectedKey]);

  // Soporte para flechas izquierda/derecha para cambiar semanas
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        if (courses[selectedKey]?.weeks[selectedWeek + 1] === undefined) return;
        setSelectedWeek((prev) => prev + 1);
      } else if (event.key === "ArrowLeft") {
        if (courses[selectedKey]?.weeks[selectedWeek - 1] === undefined) return;
        setSelectedWeek((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedWeek, courses, selectedKey]);

  // Manejar selección de curso
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedUo(null);
    localStorage.setItem("selectedCourse", course);
    localStorage.removeItem("selectedUo");
  };

  // Manejar introducción de UO
  const handleUoSubmit = async (uo) => {
    setSelectedUo(uo);
    setSelectedCourse(null);
    localStorage.setItem("selectedUo", uo);
    localStorage.removeItem("selectedCourse");

    setLoading(true);
    try {
      const data = await exitFetch(uo);
      if (data.subjects.length === 0) {
        setLoading(false);
        return;
      }

      const courseMap = parseSubjectsToYears(data.subjects);
      const newCourse = courseMap[uo];

      setCourses((prev) => ({
        ...prev,
        [uo]: newCourse,
      }));

      const availableWeeks = Object.keys(newCourse?.weeks || {})
        .map(Number)
        .sort((a, b) => a - b);

      if (availableWeeks.length > 0) {
        const currentWeek = getISOWeek(new Date());
        setSelectedWeek(availableWeeks.includes(currentWeek) ? currentWeek : availableWeeks[0]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const week = courses[selectedKey]?.getWeek(Number(selectedWeek));
  const days = week?.getSortedDays() || [];

  const weekOptions = Object.keys(courses[selectedKey]?.weeks || {}).map((weekNum) => {
    const label = typeof courses[selectedKey]?.getWeekLimitsDate === "function"
      ? courses[selectedKey].getWeekLimitsDate(weekNum)
      : `Semana ${weekNum}`;
    return {
      value: weekNum,
      label: label || `Semana ${weekNum}`,
    };
  });

  if (loading) return <p className="text-center mt-10 text-lg">Cargando horarios...</p>;

  return (
    <>
      <HeaderNav
        courses={courses}
        selectedCourse={selectedCourse}
        onSelectCourse={handleSelectCourse}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
        weeks={weekOptions}
        selectedUo={selectedUo}
        onUoSubmit={handleUoSubmit}
      />

      <main
        id="main-container"
        className="pt-3 px-5 pb-5 flex flex-row justify-between bg-[#FFF6DA] dark:bg-gray-700 overflow-x-auto max-w-full space-x-8"
      >
        {courses[selectedKey]
          ? days.map((day, idx) => <DayContainer key={idx} day={day} />)
          : <p className="text-center mt-10 text-4xl dark:text-white">No hay horarios para esta semana</p>}
      </main>

      <FooterEnd />
    </>
  );
}

export default App;
