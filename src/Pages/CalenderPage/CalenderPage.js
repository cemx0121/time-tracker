//import styles from "./CalenderPage.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WorkShiftTable from "../../Components/WorkShift/WorkShiftTable";
import WorkHoursTable from "../../Components/WorkHours/WorkHoursTable";
import ApiService from "../../Services/ApiService";
function CalenderPage() {
  return (
    <Container className="p-4 ">
      <Tabs
        defaultActiveKey="workShifts"
        id="calender-tab"
        className="mb-3"
        justify
      >
        <Tab eventKey="workShifts" title="Work Shifts">
          <Row className="justify-content-md-center">
            <Col md={12}>
              <WorkShiftTable />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="hours" title="Work Hours">
          <Row className="justify-content-md-center">
            <Col md={12}>
              <WorkHoursTable
                fetchDataFunction={ApiService.getUsersWeeklyWorkShifts}
                title="My Work Hours"
                subTitle="See the total amount of work time you have put in on weekly basis"
              />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default CalenderPage;
