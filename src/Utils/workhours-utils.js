import { parse, getDay, differenceInMinutes } from "date-fns";

export const calculateWorkHours = (workShifts) => {
  const week = Array(7).fill("-");
  let totalMinutes = 0; // Total minutes worked in the week
  workShifts.forEach((shift) => {
    const date = parse(shift.date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    let dayOfWeek = getDay(date); // Sunday - 0, Monday - 1, etc.
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust so Monday is 0 and Sunday is 6

    const startTime = parse(shift.startTime, "HH:mm:ss", new Date());
    const endTime = parse(shift.endTime, "HH:mm:ss", new Date());

    const diff = differenceInMinutes(endTime, startTime);
    totalMinutes += diff; // Add to total minutes

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    week[dayOfWeek] = `${hours}:${minutes.toString().padStart(2, "0")}`;
  });

  return { week, totalMinutes };
};

export const calculatePercentage = (hours, minutes) => {
  const totalWorkMinutes = hours * 60 + minutes;
  const totalRequiredMinutes = 37 * 60; // 37 hours in minutes
  return (totalWorkMinutes / totalRequiredMinutes) * 100;
};

export const generateEmployeeSelectOptions = (users) => {
  return users.map((employee) => ({
    value: employee.userId,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={employee.imagePath}
          alt={employee.firstName}
          style={{
            width: "40px",
            height: "40px",
            marginRight: "10px",
            borderRadius: "50%",
          }}
        />
        <span>{`${employee.firstName} ${employee.lastName}`}</span>
      </div>
    ),
  }));
};
