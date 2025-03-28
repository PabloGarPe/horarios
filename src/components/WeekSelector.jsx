export const WeekSelector = ({ weeks = [], selectedWeek, onSelectWeek }) => {
  return (
    <section>
      <div className="bg-black rounded-none mx-2">
        <select
          name="week-selector"
          id="week-selector"
          value={selectedWeek}
          onChange={(e) => onSelectWeek(e.target.value)}
          className="lg:px-4 lg:py-2 px-3 py-1.5 truncate
              border-black border-2 rounded-none lg:text-xl text-base
              hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold
              -translate-x-2 -translate-y-2 bg-white focus:outline-none
              dark:text-white dark:bg-gray-600 cursor-pointer"
        >
          {weeks.map((week) => {
            return (
              <option key={week.value.value} value={week.value.value}>
                {week.value.label}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};
