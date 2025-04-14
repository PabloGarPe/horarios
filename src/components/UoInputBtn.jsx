import { useEffect, useState } from "react";
import "./styles/mainBtn.css";

export const UoInputBtn = ({ value, onChange, onSubmit, isActive }) => {
  const [localValue, setLocalValue] = useState(value || "");

  // Sincroniza con el prop `value` cuando cambia desde App
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleKeyDown = (e) => {
    const trimmed = localValue.trim();
    if (
      e.key === "Enter" &&
      (trimmed.length >= 6 || trimmed.startsWith("curso"))
    ) {
      onSubmit(trimmed);
    }
  };

  const handleBlur = () => {
    const trimmed = localValue.trim();
    if (trimmed.length >= 6 || trimmed.startsWith("curso")) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="bg-black rounded-none mx-2">
      <input
        type="text"
        placeholder="UO..."
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur} // ✅ Envía al salir del input también
        className={`min-w-[10rem] max-w-[11rem] text-center lg:px-4 lg:py-2 px-3 py-1.5 truncate border-black border-2 
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
