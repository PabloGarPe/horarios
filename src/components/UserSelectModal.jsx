import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const UserSelectModal = ({ onClose }) => {
  const navigate = useNavigate();

  // Previene el scroll de fondo mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const titulaciones = [
    { label: "Informática y Matemáticas", value: "infomates", path: "/infomates" },
    { label: "Física y Matemáticas", value: "fisimates", path: "/fisimates" },
    { label: "Matemáticas y Física", value: "matesfis", path: "/matesfis" },
    { label: "Matemáticas", value: "mates", path: "/mates" },
    { label: "Informática", value: "inform", path: "/inform" }
  ];

  const handleSelectTitulacion = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" 
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative bg-[#FFF6DA] dark:bg-gray-700 rounded-lg p-8 max-w-md w-full m-4 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:cursor-pointer transition-colors"
          >
            &times;
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Selecciona tu titulación
          </h2>

          <div className="flex flex-col gap-3">
            {titulaciones.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleSelectTitulacion(path)}
                className="bg-[#FFE4A7] hover:bg-[#FFD580] dark:bg-gray-600 dark:hover:bg-gray-500 
                  text-gray-800 dark:text-white py-3 px-6 rounded-lg transition-all
                  font-medium shadow-sm hover:shadow-md hover:cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
