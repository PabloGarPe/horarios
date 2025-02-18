export const generateTimeSlots = () => {
  const slots = [];
  for (let h = 8; h < 21; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00-${h.toString().padStart(2, '0')}:30`);
    slots.push(`${h.toString().padStart(2, '0')}:30-${(h + 1).toString().padStart(2, '0')}:00`);
  }
  return slots;
};