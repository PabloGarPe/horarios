// App.jsx
import { useEffect, useState } from "react";
import { DayContainer } from "./components/DayContainer";
import { HeaderNav } from "./components/HeaderNav";
import { FooterEnd } from "./components/FooterEnd";
import { exitFetch } from "./utils/fetcher";
import { parseSubjectsToYears } from "./utils/dataParser";
import { getISOWeek, getYear } from "date-fns";

function App() {
  const [userSource, setUserSource] = useState(null);
  const [courseMap, setCourseMap] = useState({});
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // ✅ Restaurar estado desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("userSource");
    const savedSemester = localStorage.getItem("selectedSemester");
    const savedWeek = localStorage.getItem("selectedWeek");

    if (savedUser) handleUoSubmit(savedUser);
    if (savedSemester) setSelectedSemester(Number(savedSemester));
    if (savedWeek) setSelectedWeek(Number(savedWeek));
  }, []);

  // ✅ Actualizar semana automáticamente al cambiar de semestre
  useEffect(() => {
    if (!selectedSemester || !courseMap[selectedSemester]) return;

    const weeks = Object.keys(courseMap[selectedSemester]?.weeks || {})
      .map(Number)
      .sort();

    if (weeks.length > 0) {
      // Obtengo la semana acutual
      const currentDate = new Date();
      const currentWeek = getISOWeek(currentDate);
      
      // Buscar la semana más cercana si la actual no está disponible
      const closestWeek = weeks.reduce((prev, curr) => 
        Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek) ? curr : prev
      );

      setSelectedWeek(closestWeek);
      localStorage.setItem("selectedWeek", closestWeek);
      // setSelectedWeek(weeks[0]);
      // localStorage.setItem("selectedWeek", weeks[0]);
    }
  }, [selectedSemester, courseMap]);

  const handleUoSubmit = async (uo) => {
    if (!uo || uo.trim() === "") return;

    setLoading(true);
    setUserSource(uo);
    localStorage.setItem("userSource", uo);
    setNoResults(false);

    try {
      const data = await exitFetch(uo);
      const parsed = parseSubjectsToYears(data);

      const years = Object.keys(parsed).map(Number).sort();

      if (years.length === 0) {
        setCourseMap({});
        setSelectedSemester(null);
        setSelectedWeek(0);
        setNoResults(true);

        // ❌ limpiar localStorage si no hay datos
        localStorage.removeItem("selectedSemester");
        localStorage.removeItem("selectedWeek");
        return;
      }

      const currentDate = new Date();
      let defaultYear = getYear(currentDate);
      console.log("Año actual:", defaultYear);
      console.log("Años disponibles:", years);
      setCourseMap(parsed);
      if (!years.includes(defaultYear)) defaultYear = years[0];
      setSelectedSemester(defaultYear);
      console.log("Semestre seleccionado:", defaultYear);
      localStorage.setItem("selectedSemester", defaultYear);

      const weeks = Object.keys(parsed[defaultYear]?.weeks || {}).map(Number).sort();
      const weekToSet = weeks[0] || 0;
      setSelectedWeek(weekToSet);
      localStorage.setItem("selectedWeek", weekToSet);
    } catch (err) {
      console.error(err);
      setNoResults(true);
      setCourseMap({});
      setSelectedSemester(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourseSimulado = (label) => {
    const simulatedUo = `curso${label}`;
    handleUoSubmit(simulatedUo);
  };

  const currentYear = selectedSemester;
  const currentCourse = courseMap[currentYear];
  const week = currentCourse?.getWeek(Number(selectedWeek));
  const days = week?.getSortedDays() || [];

  const weekOptions = Object.keys(currentCourse?.weeks || {}).map((weekNum) => {
    const label = typeof currentCourse?.getWeekLimitsDate === "function"
      ? currentCourse.getWeekLimitsDate(weekNum)
      : `Semana ${weekNum}`;
    return {
      value: weekNum,
      label: label || `Semana ${weekNum}`,
    };
  });
  

  return (
    <>
      <HeaderNav
        courses={courseMap}
        weeks={weekOptions}
        selectedWeek={selectedWeek}
        onSelectWeek={(week) => {
          setSelectedWeek(week);
          localStorage.setItem("selectedWeek", week);
        }}
        selectedSemester={selectedSemester}
        onSelectSemester={(semester) => {
          setSelectedSemester(semester);
          localStorage.setItem("selectedSemester", semester);
        }}
        userSource={userSource}
        onSelectCourseSimulado={handleSelectCourseSimulado}
        onUoSubmit={handleUoSubmit}
      />

      {loading ? (
        <p className="text-center mt-10 text-lg">Cargando horarios...</p>
      ) : noResults ? (
        <p className="text-center mt-10 text-lg text-red-600">
          No se encontraron horarios para el curso o UO seleccionado.
        </p>
      ) : !currentCourse ? (
        <p className="text-center mt-10 text-lg">
          Selecciona un curso o introduce una UO para ver los horarios.
        </p>
      ) : (
        <main
          id="main-container"
          className="pt-3 px-5 pb-5 flex flex-row justify-between bg-[#FFF6DA] dark:bg-gray-700 overflow-x-auto max-w-full space-x-8"
        >
          {days.map((day, idx) => <DayContainer key={idx} day={day} />)}
        </main>
      )}

      <FooterEnd />
    </>
  );
}

export default App;
