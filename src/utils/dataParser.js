import { exitFetch } from "./fetcher";
import { Year, Month, Day, Subject } from "../models";


jsonData = exitFetch();

daysArray = jsonData.days;
subjectsArray = jsonData.subjects;


const parseDays = (subjectsArray) => {
    year = new Year(2);

    daysArray.forEach(day => {
        if(day.subject_year === 2){
            if(!(day.month in year.months)){
                new Month(day.month);
                year.addMonth(day.month);
            }
            if(!(day.day in year.months[day.month].days)){
                new Day(day.day, day.month);
                year.months[day.month].addDay(day.day);
            }
            newsubject = new Subject();
            year.months[day.month].days[day.day].addSubject(day.subject);
        }
    });
}