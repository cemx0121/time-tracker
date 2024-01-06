import React from "react";
import styles from "./EmployeeList.module.css";
import { MdEmail, MdPhone, MdHome } from "react-icons/md";
import { BiSolidCalendar } from "react-icons/bi";
import EmployeeInfoLine from "./EmployeeInfoLine";

const EmployeeCard = ({ employee }) => (
  <div className="col-lg-6 mt-4">
    <div className={`${styles.member} d-flex align-items-start`}>
      <div className={styles.teampic}>
        <img
          src={employee.imagePath}
          className={styles.profilePic}
          alt={`${employee.firstName} ${employee.lastName}`}
        />
      </div>
      <div className={styles.memberInfo}>
        <h4
          className={styles.name}
        >{`${employee.firstName} ${employee.lastName}`}</h4>
        <span className={styles.jobPosition}>{employee.jobPosition}</span>

        <EmployeeInfoLine icon={MdEmail} text={employee.email} />
        <EmployeeInfoLine icon={MdPhone} text={employee.phoneNumber} />
        <EmployeeInfoLine icon={MdHome} text={employee.address} />
        <EmployeeInfoLine icon={BiSolidCalendar} text={employee.hiredDate} />
      </div>
    </div>
  </div>
);

export default EmployeeCard;
