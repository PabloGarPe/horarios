import { useEffect, useState } from "react";
import { DayContainer } from "./DayContainer";
import { HeaderNav } from "./HeaderNav";
import { FooterEnd } from "./FooterEnd";
import { exitFetch } from "../utils/fetcher";
import { parseSubjectsToYears } from "../utils/dataParser";
import { getISOWeek, getYear } from "date-fns";
import { UserSelectModal } from "./UserSelectModal";
import { WeekNavigationButtons } from "./WeekNavigationButtons";

export const ScheduleView = ({ defaultTitulacion, titulacion, cursos }) => {
  const [userSource, setUserSource] = useState(null);
  const [courseMap, setCourseMap] = useState({});
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("userSource");
    const savedSemester = localStorage.getItem("selectedSemester");
    const savedWeek = localStorage.getItem("selectedWeek");

    if (savedUser) {
      handleUoSubmit(savedUser);
    } else if (defaultTitulacion) {
      // Aquí podríamos manejar la lógica específica de la titulación
      // sin confundirla con el UO del alumno
      handleTitulacionChange(defaultTitulacion);
    }

    if (savedSemester) setSelectedSemester(Number(savedSemester));
    if (savedWeek) setSelectedWeek(Number(savedWeek));
  }, [defaultTitulacion]);

  useEffect(() => {
    if (!selectedSemester || !courseMap[selectedSemester]) return;

    const weeks = Object.keys(courseMap[selectedSemester]?.weeks || {})
      .map(Number)
      .sort();

    if (weeks.length > 0) {
      const currentDate = new Date();
      const currentWeek = getISOWeek(currentDate);

      const closestWeek = weeks.reduce((prev, curr) =>
        Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek) ? curr : prev
      );

      setSelectedWeek(closestWeek);
      localStorage.setItem("selectedWeek", closestWeek);
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
        setNoResults(true);
        setCourseMap({});
        setSelectedSemester(null);
        localStorage.removeItem("selectedSemester");
        localStorage.removeItem("selectedWeek");
        return;
      }

      const currentDate = new Date();
      let defaultYear = getYear(currentDate);
      setCourseMap(parsed);
      
      if (!years.includes(defaultYear)) defaultYear = years[0];
      setSelectedSemester(defaultYear);
      localStorage.setItem("selectedSemester", defaultYear);

      const weeks = Object.keys(parsed[defaultYear]?.weeks || {}).map(Number).sort();
      const weekToSet = weeks[0] || 0;
      setSelectedWeek(weekToSet);
      localStorage.setItem("selectedWeek", weekToSet);
    } catch (err) {
      console.error(err); // <- Este error es importante mantenerlo ya que es para manejo de errores
      setNoResults(true);
      setCourseMap({});
      setSelectedSemester(null);
    } finally {
      setLoading(false);
    }
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(Number(week));
    localStorage.setItem("selectedWeek", week);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(Number(semester));
    localStorage.setItem("selectedSemester", semester);
  };

  const handleSelectCourseSimulado = (value) => {
    handleUoSubmit(value); // Usar directamente el value sin modificar
  };

  const handleTitulacionChange = (titulacion) => {
    // Lógica específica para manejar el cambio de titulación
    localStorage.setItem("titulacion", titulacion);
    // Otras operaciones específicas de la titulación
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
    <div className="min-h-screen bg-[#FFF6DA] dark:bg-gray-700">
      {showModal && (
        <UserSelectModal
          onClose={() => setShowModal(false)}
        />
      )}

      <div className={`transition-all duration-300 ${
        showModal ? "blur-sm pointer-events-none select-none" : ""
      }`}>
        <HeaderNav
          courses={courseMap}
          selectedWeek={selectedWeek}
          onSelectWeek={handleWeekChange}
          weeks={weekOptions}
          selectedSemester={selectedSemester}
          onSelectSemester={handleSemesterChange}
          userSource={userSource}
          onSelectCourseSimulado={handleSelectCourseSimulado}
          onUoSubmit={handleUoSubmit}
          onChangeTit={() => setShowModal(true)}
          titulacion={titulacion}
          cursos={cursos} // Asegúrate de pasar los cursos
        />

        {loading ? (
          <p id="main-container" className="text-center mt-10 text-lg">Cargando horarios...</p>
        ) : noResults ? (
          <p id="main-container" className="text-center mt-10 text-lg text-red-600">
            No se encontraron horarios para el curso o UO seleccionado.
          </p>
        ) : !currentCourse ? (
          <p id="main-container" className="text-center mt-10 text-lg">
            Selecciona un curso o introduce una UO para ver los horarios.
          </p>
        ) : (
          <main id="main-container" className="pt-3 px-5 pb-5 flex flex-row justify-between bg-[#FFF6DA] dark:bg-gray-700 overflow-x-auto max-w-full space-x-8">
            {days.map((day, idx) => (
              <DayContainer key={idx} day={day} />
            ))}
          </main>
        )}

        {/* Botones de navegación de semanas */}
        {!loading && !noResults && currentCourse && weekOptions.length > 1 && (
          <WeekNavigationButtons 
            weeks={weekOptions}
            selectedWeek={selectedWeek}
            onSelectWeek={handleWeekChange}
          />
        )}

        <FooterEnd />
      </div>
    </div>
  );
};