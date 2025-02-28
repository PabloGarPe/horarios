import { useState } from "react"

export const YearBtn = ({ year }) => {
    const [clicked, setClicked] = useState(false)

    const yearClicked = (newClicked) => {
        newClicked = !newClicked
        console.log(`1 Year ${year} clicked and clicked is ${newClicked}`)
        setClicked(newClicked)
        console.log(`2 Year ${year} clicked and clicked is ${newClicked}`)
    }

    return (
        <button className="bg-black rounded-none mx-2">
            <span className={` block px-4 py-2  truncate
   border-black border-2 rounded-none text-xl hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold ${clicked ? "bg-red-600 transition-colors duration-200" : "bg-white -translate-x-2 -translate-y-2"}`} onClick={() => yearClicked(clicked)}>
                Year {year}
            </span>
        </button>

    )
}

//active:bg-red-600 active:transition-colors active:duration-200 