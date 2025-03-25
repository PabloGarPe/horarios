export class Day {
    constructor(day, mes, year, diaSemana) {
        this.dia = day;
        this.mes = mes;
        this.year = year;
        this.weekDay = diaSemana;
        this.subjects = [];
    }

    addSubject(subject){
        this.subjects.push(subject);
    }
}