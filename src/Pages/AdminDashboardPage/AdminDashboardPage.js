import { Container, Tab, Tabs } from "react-bootstrap";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import ApiService from "../../Services/ApiService";
import WorkHoursTable from "../../Components/WorkHours/WorkHoursTable";

import UseFetchUsers from "../../Hooks/UseFetchUsers";
import { useSelector } from "react-redux";
import { generateEmployeeSelectOptions } from "../../Utils/workhours-utils";

import { Row, Col } from "react-bootstrap";
import SectionTitle from "../../Components/UI/SectionTitle";
function AdminDashboardPage() {
  const { userData } = useSelector((state) => state.auth);
  const users = UseFetchUsers();
  const filteredUsers = users.filter((u) => u.userId !== userData.userId);
  const employeeOptions = generateEmployeeSelectOptions(filteredUsers);

  return (
    <Container className="p-4 ">
      <Tabs
        defaultActiveKey="employeeWorkHours"
        id="admin-tab"
        className="mb-3"
      >
        <Tab eventKey="employeeWorkHours" title="Employee Work Hours">
          <WorkHoursTable
            title="Employee Work Hours"
            subTitle="See the total amount of work time an employee has put in on weekly basis"
            fetchDataFunction={ApiService.getSpecificUsersWeeklyWorkShifts}
            showEmployeeSelect={true}
            employeeOptions={employeeOptions}
          />
        </Tab>

        <Tab eventKey="userSettings" title="User Settings">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <SectionTitle
                title="Update user"
                subTitle="Choose a user and select their new role and/or job position."
              />
            </Col>
            <Col md={6}>
              <SectionTitle
                title="Delete user"
                subTitle="Select a user account to delete from the dashboard system."
              />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="createUser" title="Create User">
          <RegisterForm />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminDashboardPage;
