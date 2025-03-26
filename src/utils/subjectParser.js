export const extractSubjectKey = (name) => {
    if (!name) return '';
  
    // Prioridad: guion > punto
    if (name.includes('-')) {
      return name.split('-')[0].toUpperCase();
    }
  
    if (name.includes('.')) {
      return name.split('.')[0].toUpperCase();
    }
  
    return name.toUpperCase(); // fallback por si acaso
  };
  