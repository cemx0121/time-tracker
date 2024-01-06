import { useState, useEffect } from "react";
import { startOfISOWeek, getISOWeekYear, getISOWeek } from "date-fns";
import { calculateWorkHours } from "../Utils/workhours-utils";

const useFetchWeeklyShifts = (
  selectedDate,
  fetchDataFunction,
  additionalParams = []
) => {
  const [weeklyData, setWeeklyData] = useState({
    weeklyWorkShifts: [],
    totalWorkHours: { hours: 0, minutes: 0 },
    dailyWorkHours: [],
  });

  useEffect(() => {
    const isParamsValid =
      (additionalParams.length > 0 &&
        additionalParams.every((param) => param !== null)) ||
      additionalParams.length === 0;

    if (isParamsValid) {
      const fetchWeekData = (date) => {
        const weekStart = startOfISOWeek(date);
        const year = getISOWeekYear(weekStart);
        const weekNumber = getISOWeek(weekStart);

        fetchDataFunction(year, weekNumber, ...additionalParams)
          .then((res) => {
            const workShifts = res.data;
            const { week, totalMinutes } = calculateWorkHours(workShifts);

            setWeeklyData({
              weeklyWorkShifts: workShifts,
              totalWorkHours: {
                hours: Math.floor(totalMinutes / 60),
                minutes: totalMinutes % 60,
              },
              dailyWorkHours: week,
            });
          })
          .catch((err) => console.log(err));
      };
      fetchWeekData(selectedDate);
    }
  }, [selectedDate, JSON.stringify(additionalParams)]);

  return weeklyData;
};

export default useFetchWeeklyShifts;
