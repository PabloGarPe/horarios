// Week.js
import { Day } from './Day.js';
import { getDateOfISOWeek } from '../utils/dateUtils.js';

export class Week {
  constructor(weekNumber, year) {
    this.weekNumber = weekNumber;
    this.year = year;
    this.days = {}; // Clave: "Lunes", "Martes", etc.
  }

  addSubject(subject) {
    const { dia, mes, year, diaSemana } = subject.day;

    if (!this.days[diaSemana]) {
      this.days[diaSemana] = new Day(dia, mes, year, diaSemana);
    }

    this.days[diaSemana].addSubject(subject);
  }

  getSortedDays() {
    const order = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const monday = getDateOfISOWeek(this.weekNumber, this.year);

    return order.map((dayName, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const dia = date.getDate();
      const mes = date.getMonth() + 1;
      const year = date.getFullYear();

      // Si el día ya existe con asignaturas, lo usamos
      return this.days[dayName] || new Day(dia, mes, year, dayName);
    });
  }
}