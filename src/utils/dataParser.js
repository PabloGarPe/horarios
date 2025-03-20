import { exitFetch } from "./fetcher";

jsonData = exitFetch();

daysArray = jsonData.days;
subjectsArray = jsonData.subjects;


const parseDays = (daysArray) => {
    year = new Year(2);

    daysArray.forEach(day => {
        if(day.week)
    });
}