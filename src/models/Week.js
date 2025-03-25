// Week.js
import { Day } from './Day.js';

export class Week {
  constructor(weekNumber, year) {
    this.weekNumber = weekNumber;
    this.year = year;
    this.days = {}; // Clave: 'Lunes', 'Martes', etc.
  }

  addSubject(subject) {
    const { dia, mes, year, diaSemana } = subject.day;
    if (!this.days[diaSemana]) {
      this.days[diaSemana] = new Day(dia, mes, year, diaSemana);
    }
    this.days[diaSemana].addSubject(subject);
  }

  getSortedDays() {
    const order = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return order
      .filter(d => this.days[d])
      .map(d => this.days[d]);
  }
}