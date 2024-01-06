import React from "react";
import styles from "./WorkShiftTable.module.css";
import Form from "react-bootstrap/Form";
import { VscSend } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";

function WorkShiftEditRow({
  workShift,
  editWorkShift,
  handleWorkShiftChange,
  setIsEditing,
  handleSubmit,
}) {
  return (
    <>
      <td className={styles.td}>
        <Form.Control
          className={styles.formControl}
          type="time"
          name="startTime"
          value={editWorkShift.startTime}
          onChange={handleWorkShiftChange}
        />
      </td>
      <td className={styles.td}>
        <Form.Control
          className={styles.formControl}
          type="time"
          name="endTime"
          value={editWorkShift.endTime}
          onChange={handleWorkShiftChange}
        />
      </td>
      <td className={styles.td}>
        <Form.Select
          className={styles.formControl}
          aria-label="Location"
          name="location"
          onChange={handleWorkShiftChange}
          value={editWorkShift.location}
        >
          <option key="option1" value="Office">
            Office
          </option>
          <option key="option2" value="Home">
            Home
          </option>
        </Form.Select>
      </td>
      <td className={styles.td} style={{ width: "80px" }}>
        <>
          <VscSend
            size={25}
            onClick={handleSubmit}
            className={`${styles.iconButton} ${styles.sendIcon}`}
          />

          {workShift && (
            <MdOutlineCancel
              size={25}
              className={`${styles.iconButton} ${styles.cancelIcon}`}
              onClick={() => setIsEditing(false)}
            />
          )}
        </>
      </td>
    </>
  );
}

export default WorkShiftEditRow;
