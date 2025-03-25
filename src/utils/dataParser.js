import { Subject } from '../models/Subject';
import { Year } from '../models/Year';

export const parseSubjectsToYears = (subjectsArray) => {
  const courseMap = {}; // ej: {1: Year, 2: Year}

  subjectsArray.forEach(item => {
    const subject = new Subject(item);
    const course = subject.year; // Aquí usamos el curso académico (1, 2, 3...)

    if (!courseMap[course]) {
      courseMap[course] = new Year(subject.day.year); // seguimos usando Year como estructura
    }

    courseMap[course].addSubject(subject);
  });

  return courseMap;
};
