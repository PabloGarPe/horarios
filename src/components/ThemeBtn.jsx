import { useState } from "react"
import './styles/mainBtn.css'
import { useTheme } from "./ThemeContext"


export const ThemeBtn = ({children}) => {
    const [clicked, setClicked] = useState(false)

    const btnClicked = (newClicked) => {
        newClicked = !newClicked
        setClicked(newClicked)
    }

    const { toggleTheme } = useTheme()

    const handleThemeChange = () => {
        toggleTheme()
    }

    const triggerFunctions = (clicked) => {
        handleThemeChange();
        btnClicked(clicked);
    }

    return (
        <button className="bg-black rounded-none mx-2" onClick={() => triggerFunctions(clicked)}>
            <span className={` block px-4 py-2  truncate
   border-black border-2 rounded-none text-xl hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 ${clicked ? "btn-clicked" : "bg-white"}`}>
                {children}
            </span>
        </button>
    )
}