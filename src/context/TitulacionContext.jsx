import { createContext, useState, useContext } from 'react';

const TitulacionContext = createContext();

export const TitulacionProvider = ({ children }) => {
  const [currentTitulacion, setCurrentTitulacion] = useState(
    localStorage.getItem('titulacion') || 'infomates'
  );

  const updateTitulacion = (newTitulacion) => {
    setCurrentTitulacion(newTitulacion);
    localStorage.setItem('titulacion', newTitulacion);
  };

  return (
    <TitulacionContext.Provider value={{ currentTitulacion, updateTitulacion }}>
      {children}
    </TitulacionContext.Provider>
  );
};

export const useTitulacion = () => useContext(TitulacionContext);