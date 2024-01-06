import { useState, useEffect } from "react";
import ApiService from "../Services/ApiService";

const useFetchWorkShifts = (selectedDate, refetchTrigger) => {
  const [workShifts, setWorkShifts] = useState(null);

  useEffect(() => {
    ApiService.getWorkShiftsForDate(selectedDate).then((res) => {
      setWorkShifts(res.data);
    });
  }, [selectedDate, refetchTrigger]);

  return workShifts;
};

export default useFetchWorkShifts;
