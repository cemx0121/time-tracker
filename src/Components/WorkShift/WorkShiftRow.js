import styles from "./WorkShiftTable.module.css";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

function WorkShiftRow({
  workShift,
  isCurrentUser,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <>
      {!workShift && (
        <>
          <td
            className={`${styles.alignMiddle} ${styles.notRegistered}`}
            colSpan={3}
          >
            Employee has not yet registered for this date
          </td>
          <td colSpan={1}></td>
        </>
      )}
      {workShift && (
        <>
          <td className={`${styles.alignMiddle} ${styles.timeAndLocation}`}>
            {workShift ? workShift.startTime.substring(0, 5) : ""}
          </td>
          <td className={`${styles.alignMiddle} ${styles.timeAndLocation}`}>
            {workShift ? workShift.endTime.substring(0, 5) : ""}
          </td>
          <td className={`${styles.alignMiddle} ${styles.timeAndLocation}`}>
            {workShift ? workShift.location : ""}
          </td>
          <td className={`${styles.alignMiddle}`} style={{ width: "80px" }}>
            {isCurrentUser && (
              <div className={`${styles.iconContainer}`}>
                <FaRegEdit
                  size={22}
                  className={`${styles.iconButton} ${styles.editIcon}`}
                  onClick={() => handleEditClick(workShift)}
                />

                <BsTrash
                  size={22}
                  className={`${styles.iconButton} ${styles.trashIcon}`}
                  onClick={() => handleDeleteClick(workShift.workShiftId)}
                />
              </div>
            )}
          </td>
        </>
      )}
    </>
  );
}

export default WorkShiftRow;
