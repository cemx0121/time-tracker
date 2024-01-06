import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./EmployeeList.module.css";
import EmployeeCard from "./EmployeeCard";
import ApiService from "../../Services/ApiService";
import { formatDateToLongString } from "../../Utils/string-utils";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    function fetchData() {
      ApiService.getAllProfiles()
        .then((response) => {
          const preparedData = response.data.map((e) => {
            return { ...e, hiredDate: formatDateToLongString(e.hiredDate) };
          });
          setEmployeeList(preparedData);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <section className={styles.team}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2 className={styles.title}>Company Employees</h2>
          <div className={styles.underline}></div>
          <p className={styles.titleInfo}>
            Find information about your colleagues
          </p>
        </div>

        <div className="row justify-content-center">
          {employeeList
            .filter((up) => up.email === userData.email)
            .map((employee) => (
              <EmployeeCard key={employee.email} employee={employee} />
            ))}
        </div>
        <div className="row">
          {employeeList
            .filter((up) => up.email !== userData.email)
            .map((employee) => (
              <EmployeeCard key={employee.email} employee={employee} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default EmployeeList;
