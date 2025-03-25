import { exitFetch } from "./fetcher";
import { Year } from "../models/Year";
import { Day } from "../models/Day";
import { Subject } from "../models/Subject";
import { Week } from "../models/Week";

const parseDays = (daysList) => {
    year = new Year(2);

    daysList.forEach(day => {
        if(day.subject_year === 2){
            if(!(day.week in year.week)){
                new Week(day.week);
                year.addWeek(day.week);
            }
            if(!(day.day in year.week[day.week].days)){
                new Day(day.day, day.month);
                year.week[day.week].addDay(day.day);
            }
            newSubject = new Subject(day.subject_name, day.room, day.hora_inicio, day.hora_fin, day.priority);
            year.week[day.week].days[day.day].addSubject(day.subject);
        }
    });
}

export const generateDays = async (listToParse) => {
    try {
        const jsonData = await exitFetch()
        listToParse = jsonData.subjects;
        return parseDays(listToParse);
    } catch (e) {
        console.error(e);
    }
}
