import React from "react";
import styles from "./EmployeeList.module.css";

const EmployeeInfoLine = ({ icon, text }) => {
  const Icon = icon;
  return (
    <div className={`d-flex align-items-center ${styles.infoLine}`}>
      <Icon size={20} className="me-2" />
      <span>{text}</span>
    </div>
  );
};

export default EmployeeInfoLine;
