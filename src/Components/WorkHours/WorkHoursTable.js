import { useState } from "react";
import useFetchWeeklyShifts from "../../Hooks/UseFetchWeeklyShifts";
import styles from "./WorkHoursTable.module.css";

import DatePicker from "react-datepicker";
import Table from "react-bootstrap/Table";
import WorkHoursProgess from "./WorkHoursProgess";
import SectionTitle from "../UI/SectionTitle";

import { da } from "date-fns/locale";
import { calculatePercentage } from "../../Utils/workhours-utils";
import Select from "react-select";
function WorkHoursTable({
  fetchDataFunction,
  additionalParams,
  title,
  subTitle,
  showEmployeeSelect = false,
  employeeOptions = [],
}) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { totalWorkHours, dailyWorkHours } = useFetchWeeklyShifts(
    selectedDay,
    fetchDataFunction,
    showEmployeeSelect ? [selectedEmployee] : additionalParams
  );

  const workHoursPercentage = calculatePercentage(
    totalWorkHours.hours,
    totalWorkHours.minutes
  );

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption ? selectedOption.value : null);
  };

  const shouldShowTable =
    !showEmployeeSelect || (showEmployeeSelect && selectedEmployee);

  return (
    <>
      <SectionTitle title={title} subTitle={subTitle} />
      <div className={styles.wrapper}>
        <Table striped className={styles.roundedTable}>
          <thead>
            <tr>
              <th
                colSpan="8"
                className={`${styles.headerCell} ${
                  !shouldShowTable ? styles.headerCellNoTable : ""
                } text-center`}
                style={{ borderBottom: "none" }}
              >
                <div className={styles.selectAndDatePickerContainer}>
                  <div className={styles.datePickerWrapper}>
                    <DatePicker
                      selected={selectedDay}
                      onChange={handleDateChange}
                      showWeekNumbers
                      showMonthDropdown
                      showYearDropdown
                      locale={da}
                      showWeekPicker
                      dateFormat="I/R"
                    />
                  </div>
                  {showEmployeeSelect && (
                    <div className={styles.selectWrapper}>
                      <Select
                        styles={customStyles}
                        options={employeeOptions}
                        onChange={handleEmployeeChange}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select an employee"
                      />
                    </div>
                  )}
                </div>
              </th>
            </tr>

            <tr style={{ textAlign: "center" }}>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
              <th>Fulfillment</th>
            </tr>
          </thead>
          {shouldShowTable && (
            <tbody>
              <tr style={{ textAlign: "center" }}>
                {dailyWorkHours.map((hours, index) => (
                  <td
                    key={index}
                    className={index === 0 ? styles.firstFooterCell : ""}
                  >
                    {hours}
                  </td>
                ))}
                <td className={styles.lastFooterCell}>
                  <WorkHoursProgess
                    totalWorkHours={totalWorkHours}
                    workHoursPercentage={workHoursPercentage}
                  />
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    </>
  );
}

export default WorkHoursTable;

const customStyles = {
  control: (provided, state) => ({
    ...provided,

    backgroundColor: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected
      ? "tomato"
      : state.isFocused
      ? "lightgray"
      : "white",
    fontWeight: state.isSelected ? "bold" : "normal",
  }),
  container: (provided) => ({
    ...provided,
    width: "300px",
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    borderColor: "black",
  }),
};
