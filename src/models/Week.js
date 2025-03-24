export class Week {
    constructor(firstDay){
        this.firstDay = firstDay;
        this.days = [];
    }

    addDay(day){
        this.days.push(day);
    }
}