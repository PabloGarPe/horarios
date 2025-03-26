export const getDurationInMinutes = (start, end) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    return (endH * 60 + endM) - (startH * 60 + startM);
  };
  
export const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};
  