import { useEffect, useState } from "react";
import "./styles/mainBtn.css";
import { useTheme } from "./ThemeContext";

export const ThemeBtn = ({ children }) => {
    const [clicked, setClicked] = useState(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light");
        }
        return storedTheme === "dark";
    });

    const { toggleTheme } = useTheme();

    const handleThemeChange = () => {
        const newTheme = !clicked ? "dark" : "light"; // Invertimos la lógica aquí
        localStorage.setItem("theme", newTheme);
        
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        
        toggleTheme();
        setClicked(!clicked);
    };

    // Este useEffect se ejecuta solo una vez al montar el componente
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        // Aplicar el tema inicial
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setClicked(true);
        } else {
            document.documentElement.classList.remove("dark");
            setClicked(false);
        }
    }, []);

    return (
        <button
            className="bg-black rounded-none mx-2"
            onClick={handleThemeChange}
        >
            <span
                className={`block lg:px-4 lg:py-2 px-3 py-1.5 truncate
   border-black border-2 rounded-none lg:text-xl text-base hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 cursor-pointer ${
       clicked ? "btn-clicked" : "bg-white"
   }`}
            >
                {children}
            </span>
        </button>
    );
};