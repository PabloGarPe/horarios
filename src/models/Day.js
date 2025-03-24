export class Day{
    constructor(dayNumber){
        this.dayNumber = dayNumber;
        this.subjects = [];
    }

    addSubject(subject){
        this.subjects.push(subject);
    }
}