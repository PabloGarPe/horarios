export const YearBtn = ({ year, setYear }) => {
    return (
        <button class="bg-black rounded-none mx-2">
  <span class="bg-white block p-4 -translate-x-2 truncate
  -translate-y-2 border-black border-2 rounded-none text-2xl active:bg-red-600 active:transition-colors active:duration-200 hover:translate-x-0 hover:translate-y-0 transition-all" onClick={() => setYear(year)}> 
       {year} year
  </span> 
 </button>
       
    )
}