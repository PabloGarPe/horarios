export const SemesterSelector = ({ courses = {}, selectedSemester, onSelectSemester }) => {
  const years = Object.keys(courses)
    .map(Number)
    .sort((a, b) => a - b);

  if (years.length < 2) return null;

  const semesterOptions = [
    { label: `1º semestre`, value: years[0] },
    { label: `2º semestre`, value: years[1] },
  ];

  return (
    <section>
      <div className="bg-black rounded-none mx-2">
        <select
          name="semester-selector"
          id="semester-selector"
          value={selectedSemester}
          onChange={(e) => onSelectSemester(Number(e.target.value))}
          className="lg:px-4 lg:py-2 px-3 py-1.5 truncate
              border-black border-2 rounded-none lg:text-xl text-base
              hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold
              -translate-x-2 -translate-y-2 bg-white focus:outline-none
              dark:text-white dark:bg-gray-600 cursor-pointer"
        >
          {semesterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
