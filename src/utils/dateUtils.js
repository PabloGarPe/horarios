// utils/dateUtils.js
export function getDateOfISOWeek(week, year) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = simple.getDay();
    const ISOweekStart = new Date(simple);
  
    // Ajustar al lunes más cercano
    if (dayOfWeek <= 4) {
      ISOweekStart.setDate(simple.getDate() - dayOfWeek + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - dayOfWeek);
    }
  
    return ISOweekStart;
  }
  
  // utils/dateUtils.js (o donde prefieras)
export function getWeekDayName(year, month, day) {
  const date = new Date(year, month - 1, day);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
}