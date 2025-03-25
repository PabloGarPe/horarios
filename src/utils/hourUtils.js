export const generateHourSlots = (start = 9, end = 20) => {
    const slots = [];
    for (let h = start; h < end; h++) {
      const hour = h.toString().padStart(2, '0');
      slots.push(`${hour}:00`);
    }
    return slots;
  };
  