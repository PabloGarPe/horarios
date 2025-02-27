export const YearBtn = ({ year, setYear }) => {
    return (
        <button className="brutalist-button p-2 rounded-none border-4 border-black bg-white text-black hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => setYear(year)}>
            <p className="font-mono text-lg font-extrabold">Year: {year}</p>
        </button>
    )
}