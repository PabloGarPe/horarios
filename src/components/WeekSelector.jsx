export const WeekSelector = () => {
    return (
        <section>
           
            <div className="bg-black rounded-none mx-2">
                <select name="week-selector" id="week-selector" className="px-4 py-2  truncate
   border-black border-2 rounded-none text-xl hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 bg-white focus:outline-none">
                    <option value="1">Semana 1</option>
                    <option value="2">Semana 2</option>
                    <option value="3">Semana 3</option>
                    <option value="4">Semana 4</option>
                    <option value="5">Semana 5</option>
                    <option value="6">Semana 6</option>
                    <option value="7">Semana 7</option>
                    <option value="8">Semana 8</option>
                    <option value="9">Semana 9</option>
                    <option value="10">Semana 10</option>
                    <option value="11">Semana 11</option>
                    <option value="12">Semana 12</option>
                    <option value="13">Semana 13</option>
                </select>
            </div>
        </section>
    )
}