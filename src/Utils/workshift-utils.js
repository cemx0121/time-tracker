import { toast } from "react-toastify";

export const validateWorkShiftTimes = (editWorkShift) => {
  if (!editWorkShift.startTime) {
    toast.error("Please fill in the meet time.");
    return false;
  }
  if (!editWorkShift.endTime) {
    toast.error("Please fill in the leave time.");
    return false;
  }

  const startTime = new Date(`1970-01-01T${editWorkShift.startTime}:00`);
  const endTime = new Date(`1970-01-01T${editWorkShift.endTime}:00`);

  if (startTime >= endTime) {
    toast.error("Meet time must be earlier than leave time.");
    return false;
  }

  return true;
};

export const prepareWorkShiftData = (editWorkShift, userData, selectedDate) => {
  return {
    ...editWorkShift,
    userId: userData.userId,
    date: selectedDate,
    startTime: `${editWorkShift.startTime}:00`,
    endTime: `${editWorkShift.endTime}:00`,
  };
};

export const findWorkShift = (userId, workShifts) => {
  return workShifts.find((ws) => ws.userId === userId);
};
