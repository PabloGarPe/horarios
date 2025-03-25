export class Subject {
    constructor({hora_inicio, hora_final, subject_name, subject_year, priority, clase, day}) {
        this.startTime = hora_inicio;
        this.endTime = hora_final;
        this.name = subject_name;
        this.year = subject_year;
        this.priority = priority;
        this.classroom = clase;
        this.day = day;
    }
}