export class Year {
    constructor(yearNumber){
        this.yearNumber = yearNumber;
        this.weeks = [];
    }

    addWeek(week){
        this.weeks.push(week);
    }
}