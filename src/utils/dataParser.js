import { Subject } from '../models/Subject';
import { Year } from '../models/Year';
import { getWeekDayName } from './dateUtils';

export const parseSubjectsToYears = (subjectsArray) => {
  const yearMap = {}; // ej: {2024: Year}

  subjectsArray.forEach(item => {
    // Estructura del "día" como espera el constructor de Year/Week/Day
    const day = {
      dia: item.clase_dia,
      mes: item.clase_mes,
      year: item.clase_year,
      diaSemana: getWeekDayName(item.clase_year, item.clase_mes, item.clase_dia) // tipo "Lunes"
    };

    // Instancia Subject adaptada
    const subject = new Subject({
      hora_inicio: item.clase_hora_inicio,
      hora_final: item.clase_hora_final,
      subject_name: `${item.clase_subjectNombre}-${item.clase_tipo}`,
      subject_year: item.clase_year,
      priority: 1, // o algún valor si tenés lógica de prioridades
      clase: item.clase_aula,
      day
    });

    const yearKey = item.clase_year;
    if (!yearMap[yearKey]) {
      yearMap[yearKey] = new Year(yearKey);
    }

    yearMap[yearKey].addSubject(subject);
  });

  return yearMap;
};
