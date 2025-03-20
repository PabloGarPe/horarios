import { useEffect, useState } from "react";
import "./styles/mainBtn.css";
import { useTheme } from "./ThemeContext";

export const ThemeBtn = ({ children }) => {
    const [clicked, setClicked] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });

    const { toggleTheme } = useTheme();

    // Alterna el tema y actualiza el estado
    const handleThemeChange = () => {
        toggleTheme();
        const newTheme = clicked ? "light" : "dark";
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        setClicked(!clicked);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
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
   border-black border-2 rounded-none lg:text-xl text-base hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 ${
       clicked ? "btn-clicked" : "bg-white"
   }`}
            >
                {children}
            </span>
        </button>
    );
};