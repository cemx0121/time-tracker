import { ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./WorkHoursTable.module.css";

function WorkHoursProgess({ totalWorkHours, workHoursPercentage }) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 100, hide: 100 }}
      overlay={
        <Tooltip id="button-tooltip">
          Worked: {totalWorkHours.hours}h {totalWorkHours.minutes}m / 37h
        </Tooltip>
      }
    >
      <ProgressBar>
        <ProgressBar
          className={workHoursPercentage > 100 ? styles.goldenGlow : ""}
          variant={workHoursPercentage > 100 ? "" : "success"}
          now={workHoursPercentage}
          key={1}
          striped
        />
        <ProgressBar
          variant="danger"
          now={workHoursPercentage > 100 ? 0 : 100 - workHoursPercentage}
          key={2}
          striped
        />
      </ProgressBar>
    </OverlayTrigger>
  );
}

export default WorkHoursProgess;
