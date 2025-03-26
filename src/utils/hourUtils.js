// utils/hourUtils.js
export const generateTimeSlots = (start = 9, end = 20, interval = 30) => {
  const slots = [];
  for (let h = start; h < end; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return slots;
};
