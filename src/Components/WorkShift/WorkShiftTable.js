import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./WorkShiftTable.module.css";

import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import InfoModal from "../UI/InfoModal";
import Button from "react-bootstrap/Button";
import WorkShiftEditRow from "./WorkShiftEditRow";
import WorkShiftRow from "./WorkShiftRow";

import { da } from "date-fns/locale";
import ApiService from "../../Services/ApiService";
import useFetchUsers from "../../Hooks/UseFetchUsers";
import useFetchWorkShifts from "../../Hooks/UseFetchWorkShifts";
import { formatDateToLongString } from "../../Utils/string-utils";
import {
  validateWorkShiftTimes,
  prepareWorkShiftData,
  findWorkShift,
} from "../../Utils/workshift-utils";
import SectionTitle from "../UI/SectionTitle";

const WorkShiftTable = () => {
  const { userData } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const users = useFetchUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [editWorkShift, setEditWorkShift] = useState({
    startTime: "",
    endTime: "",
    location: "Office",
  });
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const workShifts = useFetchWorkShifts(selectedDate, refetchTrigger);
  const [workShiftToDelete, setWorkShiftToDelete] = useState(null);
  const modalRef = useRef();

  const resetWorkShiftEditState = () => {
    setIsEditing(false);
    setEditWorkShift({ startTime: "", endTime: "", location: "Office" });
  };

  useEffect(() => {
    resetWorkShiftEditState();
  }, [selectedDate]);

  const handleWorkShiftSubmit = (isEdit, workShiftId) => {
    if (!validateWorkShiftTimes(editWorkShift)) return;

    const workShiftData = prepareWorkShiftData(
      editWorkShift,
      userData,
      selectedDate
    );

    const apiCall = isEdit
      ? ApiService.updateWorkShift(workShiftId, workShiftData)
      : ApiService.addWorkShift(workShiftData);

    apiCall
      .then(() => setRefetchTrigger((prev) => prev + 1))
      .catch((err) => console.log(err))
      .finally(() => resetWorkShiftEditState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleWorkShiftSubmit(isEditing, editWorkShift.workShiftId);
  };

  const handleDeleteClick = (workShiftId) => {
    setWorkShiftToDelete(workShiftId);
    modalRef.current.show();
  };

  const handleEditClick = (workShift) => {
    setIsEditing(true);
    setEditWorkShift({
      ...workShift,
      startTime: workShift.startTime.substring(0, 5),
      endTime: workShift.endTime.substring(0, 5),
    });
  };

  const handleWorkShiftChange = (e) => {
    setEditWorkShift({ ...editWorkShift, [e.target.name]: e.target.value });
  };

  const confirmDelete = () => {
    if (workShiftToDelete) {
      ApiService.deleteWorkShift(workShiftToDelete)
        .then((res) => {
          setRefetchTrigger((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          modalRef.current.hide();
          setWorkShiftToDelete(null);
        });
    }
  };

  return (
    <>
      <SectionTitle
        title="Work Shifts"
        subTitle="View your colleagues work time and location for the day."
      />

      <Table striped hover className={styles.roundedTable}>
        <thead>
          <tr>
            <th
              colSpan="6"
              className="text-center"
              style={{ borderBottom: "none" }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showWeekNumbers
                showMonthDropdown
                showYearDropdown
                locale={da}
              />
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Name</th>
            <th className={styles.timeAndLocation}>Meet</th>
            <th className={styles.timeAndLocation}>Leave</th>
            <th className={styles.timeAndLocation}>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {workShifts !== null &&
            users.map((user) => {
              const workShift = findWorkShift(user.userId, workShifts);
              const isCurrentUser = user.userId === userData.userId;
              return (
                <tr key={user.userId}>
                  <td style={{ width: "60px" }}>
                    <img
                      className={styles.profilePicture}
                      src={user.imagePath}
                      alt={user.userId}
                    />
                  </td>
                  <td className="align-middle">{`${user.firstName} ${user.lastName}`}</td>
                  {isCurrentUser && (isEditing || !workShift) ? (
                    <WorkShiftEditRow
                      workShift={workShift}
                      editWorkShift={editWorkShift}
                      handleWorkShiftChange={handleWorkShiftChange}
                      setIsEditing={setIsEditing}
                      handleSubmit={handleSubmit}
                    />
                  ) : (
                    <WorkShiftRow
                      workShift={workShift}
                      isCurrentUser={isCurrentUser}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </tr>
              );
            })}
        </tbody>
      </Table>
      <InfoModal
        ref={modalRef}
        modalTitle="Confirm Delete"
        modalBody={
          <>
            <p>{`Are you sure you want to delete your work shift for ${formatDateToLongString(
              selectedDate
            )}`}</p>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      ></InfoModal>
    </>
  );
};

export default WorkShiftTable;
