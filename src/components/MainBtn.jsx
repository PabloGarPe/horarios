import { useState } from "react"
import './styles/mainBtn.css'

export const MainBtn = ({children}) => {
    const [clicked, setClicked] = useState(false)

    const btnClicked = (newClicked) => {
        newClicked = !newClicked
        setClicked(newClicked)
    }

    return (
        <button className="bg-black rounded-none mx-2" onClick={() => btnClicked(clicked)}>
            <span className={` block px-4 py-2  truncate
   border-black border-2 rounded-none text-xl hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 ${clicked ? "btn-clicked" : "bg-white"}`}>
                {children}
            </span>
        </button>

    )
}