import { useEffect, useRef, useState } from "react";
import "./styles/mainBtn.css";

export const UoInputBtn = ({ value, onChange, onSubmit, isActive }) => {
  const [localValue, setLocalValue] = useState(value || "");
  const debounceTimeout = useRef(null);

  // Al escribir, actualizamos localValue y aplicamos debounce
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (newValue.trim().length >= 6) {
        onSubmit(newValue.trim());
      }
    }, 800); // espera 800ms sin escribir
  };

  // Permitir enviar con Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && localValue.trim().length >= 6) {
      clearTimeout(debounceTimeout.current);
      onSubmit(localValue.trim());
    }
  };

  return (
    <div className="bg-black rounded-none mx-2">
      <input
        type="text"
        placeholder="Introduce UO..."
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`w-[10rem] lg:px-4 lg:py-2 px-3 py-1.5 truncate border-black border-2 
            rounded-none lg:text-xl text-base font-mono font-bold 
            transition-all -translate-x-2 -translate-y-2 
            hover:translate-x-0 hover:translate-y-0 
            bg-white focus:outline-none 
            dark:text-white dark:bg-gray-700 ${
              isActive ? "btn-clicked" : ""
            }`}
      />
    </div>
  );
};
